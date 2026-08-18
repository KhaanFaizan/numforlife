import "server-only";

import { randomUUID } from "node:crypto";

import { getDb } from "@/lib/cms/db";
import { BUILTIN_REDIRECT_MANIFEST } from "./builtin";
import { sanitiseRedirectPath } from "./paths";
import { PUBLIC_PAGES_WITHOUT_REDIRECT } from "./resolve";
import { readRedirectManifestFromDisk, rulesToManifest, writeRedirectManifest } from "./sync-manifest";
import type { RedirectInput, RedirectManifest, RedirectMatchType, RedirectRule } from "./types";

type RedirectRow = {
  id: string;
  source_path: string;
  destination_path: string;
  match_type: RedirectMatchType;
  enabled: number;
  note: string | null;
  created_at: string;
  updated_at: string;
};

function nowIso() {
  return new Date().toISOString();
}

function mapRow(row: RedirectRow): RedirectRule {
  return {
    id: row.id,
    sourcePath: row.source_path,
    destinationPath: row.destination_path,
    matchType: row.match_type,
    enabled: row.enabled === 1,
    note: row.note,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function ensureRedirectsTable() {
  getDb().exec(`
    CREATE TABLE IF NOT EXISTS cms_redirects (
      id TEXT PRIMARY KEY,
      source_path TEXT NOT NULL,
      destination_path TEXT NOT NULL,
      match_type TEXT NOT NULL CHECK(match_type IN ('exact', 'prefix')),
      enabled INTEGER NOT NULL DEFAULT 1 CHECK(enabled IN (0, 1)),
      note TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(source_path, match_type)
    );

    CREATE INDEX IF NOT EXISTS idx_cms_redirects_source
      ON cms_redirects(source_path);
  `);
}

function seedBuiltinRedirects() {
  ensureRedirectsTable();

  const count = getDb()
    .prepare("SELECT COUNT(*) AS count FROM cms_redirects")
    .get() as { count: number };

  if (count.count > 0) return;

  const createdAt = nowIso();
  const insert = getDb().prepare(
    `INSERT INTO cms_redirects
      (id, source_path, destination_path, match_type, enabled, note, created_at, updated_at)
     VALUES (?, ?, ?, ?, 1, ?, ?, ?)`,
  );

  const seed = getDb().transaction(() => {
    for (const [sourcePath, destinationPath] of Object.entries(BUILTIN_REDIRECT_MANIFEST.exact)) {
      insert.run(
        randomUUID(),
        sourcePath,
        destinationPath,
        "exact",
        "Seeded from WordPress migration map",
        createdAt,
        createdAt,
      );
    }

    for (const { prefix, destination } of BUILTIN_REDIRECT_MANIFEST.prefix) {
      insert.run(
        randomUUID(),
        prefix,
        destination,
        "prefix",
        "Seeded from WordPress migration map",
        createdAt,
        createdAt,
      );
    }
  });

  seed();
}

function removeStaleServiceRedirects(): boolean {
  ensureRedirectsTable();
  const del = getDb().prepare(
    "DELETE FROM cms_redirects WHERE match_type = 'exact' AND source_path = ?",
  );
  let removed = 0;
  const run = getDb().transaction(() => {
    for (const sourcePath of PUBLIC_PAGES_WITHOUT_REDIRECT) {
      removed += del.run(sourcePath).changes;
    }
  });
  run();
  return removed > 0;
}

export function syncRedirectManifestFile() {
  const manifest = rulesToManifest(
    listRedirectRules({ includeDisabled: true }).filter((rule) => rule.enabled),
  );
  writeRedirectManifest(manifest);
  return manifest;
}

export function ensureRedirectManifestReady(): RedirectManifest {
  seedBuiltinRedirects();
  if (removeStaleServiceRedirects()) {
    return syncRedirectManifestFile();
  }
  const existing = readRedirectManifestFromDisk();
  if (existing) return existing;
  return syncRedirectManifestFile();
}

export function listRedirectRules(options?: {
  includeDisabled?: boolean;
}): RedirectRule[] {
  seedBuiltinRedirects();
  if (removeStaleServiceRedirects()) {
    syncRedirectManifestFile();
  }

  const rows = getDb()
    .prepare(
      `SELECT id, source_path, destination_path, match_type, enabled, note, created_at, updated_at
         FROM cms_redirects
        ${options?.includeDisabled ? "" : "WHERE enabled = 1"}
        ORDER BY match_type ASC, source_path ASC`,
    )
    .all() as RedirectRow[];

  return rows.map(mapRow);
}

export function createRedirectRule(input: RedirectInput): RedirectRule {
  seedBuiltinRedirects();

  const sourcePath = sanitiseRedirectPath(input.sourcePath, "Source path");
  const destinationPath = sanitiseRedirectPath(input.destinationPath, "Destination path");

  if (sourcePath === destinationPath) {
    throw new Error("Source and destination cannot be the same.");
  }

  const createdAt = nowIso();
  const id = randomUUID();

  getDb()
    .prepare(
      `INSERT INTO cms_redirects
        (id, source_path, destination_path, match_type, enabled, note, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      id,
      sourcePath,
      destinationPath,
      input.matchType,
      input.enabled === false ? 0 : 1,
      input.note?.trim() || null,
      createdAt,
      createdAt,
    );

  syncRedirectManifestFile();
  return getRedirectRule(id)!;
}

export function updateRedirectRule(
  id: string,
  input: Partial<RedirectInput>,
): RedirectRule {
  const existing = getRedirectRule(id);
  if (!existing) throw new Error("REDIRECT_NOT_FOUND");

  const sourcePath = input.sourcePath
    ? sanitiseRedirectPath(input.sourcePath, "Source path")
    : existing.sourcePath;
  const destinationPath = input.destinationPath
    ? sanitiseRedirectPath(input.destinationPath, "Destination path")
    : existing.destinationPath;

  if (sourcePath === destinationPath) {
    throw new Error("Source and destination cannot be the same.");
  }

  const updatedAt = nowIso();

  getDb()
    .prepare(
      `UPDATE cms_redirects
          SET source_path = ?,
              destination_path = ?,
              match_type = ?,
              enabled = ?,
              note = ?,
              updated_at = ?
        WHERE id = ?`,
    )
    .run(
      sourcePath,
      destinationPath,
      input.matchType ?? existing.matchType,
      input.enabled === undefined ? (existing.enabled ? 1 : 0) : input.enabled ? 1 : 0,
      input.note === undefined ? existing.note : input.note?.trim() || null,
      updatedAt,
      id,
    );

  syncRedirectManifestFile();
  return getRedirectRule(id)!;
}

export function deleteRedirectRule(id: string) {
  const result = getDb().prepare("DELETE FROM cms_redirects WHERE id = ?").run(id);
  if (result.changes === 0) throw new Error("REDIRECT_NOT_FOUND");
  syncRedirectManifestFile();
}

export function getRedirectRule(id: string): RedirectRule | null {
  seedBuiltinRedirects();

  const row = getDb()
    .prepare(
      `SELECT id, source_path, destination_path, match_type, enabled, note, created_at, updated_at
         FROM cms_redirects
        WHERE id = ?`,
    )
    .get(id) as RedirectRow | undefined;

  return row ? mapRow(row) : null;
}

export function getActiveRedirectManifest(): RedirectManifest {
  return rulesToManifest(listRedirectRules());
}
