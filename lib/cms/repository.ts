import "server-only";

import { randomUUID } from "node:crypto";
import { defaultCMSContent } from "./defaults";
import { getDb } from "./db";
import { mergeWithDefaults } from "./merge";
import type { CMSContent, ContentVersionSummary } from "./types";

const HOMEPAGE_SLUG = "/";
const HOMEPAGE_ID = "page-home";

type PageRow = {
  id: string;
  published_version_id: string | null;
  draft_version_id: string | null;
};

export type SaveContentResult = {
  versionId: string;
  versionNo: number;
};

export type EditorContentState = {
  published: CMSContent;
  draft: CMSContent;
  hasDraft: boolean;
  hasUnpublishedChanges: boolean;
};

function nowIso() {
  return new Date().toISOString();
}

function parseContentJson(raw: string): CMSContent {
  try {
    return mergeWithDefaults(JSON.parse(raw) as Partial<CMSContent>);
  } catch {
    return defaultCMSContent;
  }
}

function loadVersionContent(versionId: string | null | undefined): CMSContent | null {
  if (!versionId) return null;

  const row = getDb()
    .prepare("SELECT content_json FROM cms_page_versions WHERE id = ?")
    .get(versionId) as { content_json: string } | undefined;

  return row ? parseContentJson(row.content_json) : null;
}

function nextVersionNo(pageId: string) {
  const maxRow = getDb()
    .prepare("SELECT MAX(version_no) AS max FROM cms_page_versions WHERE page_id = ?")
    .get(pageId) as { max: number | null };

  return (maxRow.max ?? 0) + 1;
}

function ensureHomepageSeeded() {
  const database = getDb();
  const existing = database
    .prepare("SELECT id FROM cms_pages WHERE slug = ?")
    .get(HOMEPAGE_SLUG) as { id: string } | undefined;

  if (existing) return;

  const createdAt = nowIso();
  const versionId = randomUUID();
  const contentJson = JSON.stringify(defaultCMSContent);

  const seed = database.transaction(() => {
    database
      .prepare(
        `INSERT INTO cms_pages
          (id, slug, title, template, status, published_version_id, draft_version_id, created_at, updated_at)
         VALUES (?, ?, ?, 'homepage', 'published', ?, NULL, ?, ?)`,
      )
      .run(HOMEPAGE_ID, HOMEPAGE_SLUG, "Homepage", versionId, createdAt, createdAt);

    database
      .prepare(
        `INSERT INTO cms_page_versions
          (id, page_id, version_no, content_json, seo_json, state, created_at)
         VALUES (?, ?, 1, ?, NULL, 'published', ?)`,
      )
      .run(versionId, HOMEPAGE_ID, contentJson, createdAt);
  });

  seed();
}

function getHomepagePage(): PageRow {
  ensureHomepageSeeded();

  return getDb()
    .prepare(
      "SELECT id, published_version_id, draft_version_id FROM cms_pages WHERE slug = ?",
    )
    .get(HOMEPAGE_SLUG) as PageRow;
}

function contentEquals(a: CMSContent, b: CMSContent) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/** Published homepage content for the public site. */
export function getPublishedContent(): CMSContent {
  const page = getHomepagePage();
  return loadVersionContent(page.published_version_id) ?? defaultCMSContent;
}

/** Current draft, falling back to published when no draft exists. */
export function getDraftContent(): CMSContent {
  const page = getHomepagePage();
  return loadVersionContent(page.draft_version_id) ?? getPublishedContent();
}

/** Draft content for preview — null when editor matches published with no saved draft. */
export function getPreviewContent(): CMSContent {
  return getDraftContent();
}

/** Admin editor payload: published baseline, working draft, and change flags. */
export function getEditorState(): EditorContentState {
  const page = getHomepagePage();
  const published = getPublishedContent();
  const draft = getDraftContent();
  const hasDraft = Boolean(page.draft_version_id);
  const hasUnpublishedChanges = !contentEquals(published, draft);

  return { published, draft, hasDraft, hasUnpublishedChanges };
}

/** Save editor changes as a draft without affecting the live site. */
export function saveDraftContent(content: CMSContent): SaveContentResult {
  const database = getDb();
  const page = getHomepagePage();
  const createdAt = nowIso();
  const versionNo = nextVersionNo(page.id);
  const versionId = randomUUID();
  const contentJson = JSON.stringify(content);

  const persist = database.transaction(() => {
    if (page.draft_version_id) {
      database
        .prepare("UPDATE cms_page_versions SET state = 'archived' WHERE id = ?")
        .run(page.draft_version_id);
    }

    database
      .prepare(
        `INSERT INTO cms_page_versions
          (id, page_id, version_no, content_json, seo_json, state, created_at)
         VALUES (?, ?, ?, ?, NULL, 'draft', ?)`,
      )
      .run(versionId, page.id, versionNo, contentJson, createdAt);

    database
      .prepare(
        `UPDATE cms_pages
         SET draft_version_id = ?, status = 'draft', updated_at = ?
         WHERE id = ?`,
      )
      .run(versionId, createdAt, page.id);
  });

  persist();

  return { versionId, versionNo };
}

/** Promote the current draft to the live published version. */
export function publishDraftContent(): SaveContentResult {
  const database = getDb();
  const page = getHomepagePage();

  if (!page.draft_version_id) {
    throw new Error("NO_DRAFT");
  }

  const createdAt = nowIso();

  const publish = database.transaction(() => {
    if (page.published_version_id) {
      database
        .prepare("UPDATE cms_page_versions SET state = 'archived' WHERE id = ?")
        .run(page.published_version_id);
    }

    database
      .prepare("UPDATE cms_page_versions SET state = 'published' WHERE id = ?")
      .run(page.draft_version_id);

    database
      .prepare(
        `UPDATE cms_pages
         SET published_version_id = ?, draft_version_id = NULL, status = 'published', updated_at = ?
         WHERE id = ?`,
      )
      .run(page.draft_version_id, createdAt, page.id);
  });

  publish();

  const version = database
    .prepare("SELECT version_no FROM cms_page_versions WHERE id = ?")
    .get(page.draft_version_id) as { version_no: number };

  return { versionId: page.draft_version_id, versionNo: version.version_no };
}

/** Discard the current draft and revert the editor to published content. */
export function discardDraftContent(): CMSContent {
  const database = getDb();
  const page = getHomepagePage();

  if (!page.draft_version_id) {
    return getPublishedContent();
  }

  const discard = database.transaction(() => {
    database
      .prepare("UPDATE cms_page_versions SET state = 'archived' WHERE id = ?")
      .run(page.draft_version_id);

    database
      .prepare(
        `UPDATE cms_pages
         SET draft_version_id = NULL, status = 'published', updated_at = ?
         WHERE id = ?`,
      )
      .run(nowIso(), page.id);
  });

  discard();

  return getPublishedContent();
}

/** Restore a historical version as a new draft (does not publish immediately). */
export function restoreVersionAsDraft(versionId: string): SaveContentResult {
  const database = getDb();
  const page = getHomepagePage();

  const source = database
    .prepare("SELECT content_json FROM cms_page_versions WHERE id = ? AND page_id = ?")
    .get(versionId, page.id) as { content_json: string } | undefined;

  if (!source) {
    throw new Error("VERSION_NOT_FOUND");
  }

  return saveDraftContent(parseContentJson(source.content_json));
}

/** Restore seeded defaults as a draft (publish separately). */
export function resetDraftContent(): CMSContent {
  saveDraftContent(structuredClone(defaultCMSContent));
  return getDraftContent();
}

/** List homepage versions newest-first. */
export function listHomepageVersions(limit = 20): ContentVersionSummary[] {
  const page = getHomepagePage();

  return getDb()
    .prepare(
      `SELECT id, version_no AS versionNo, state, created_at AS createdAt
       FROM cms_page_versions
       WHERE page_id = ?
       ORDER BY version_no DESC
       LIMIT ?`,
    )
    .all(page.id, limit) as ContentVersionSummary[];
}

/** @deprecated Use saveDraftContent + publishDraftContent instead. */
export function savePublishedContent(content: CMSContent): SaveContentResult {
  saveDraftContent(content);
  return publishDraftContent();
}

/** @deprecated Use resetDraftContent + publishDraftContent instead. */
export function resetPublishedContent(): CMSContent {
  resetDraftContent();
  publishDraftContent();
  return getPublishedContent();
}
