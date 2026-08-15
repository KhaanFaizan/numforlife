import "server-only";

import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { getDb } from "@/lib/cms/db";
import { mediaRootPath } from "@/lib/deployment/paths";
import { sanitiseFilename } from "./validate";
import type { MediaAsset } from "./types";

const MEDIA_ROOT = mediaRootPath();

type MediaRow = {
  id: string;
  filename: string;
  url: string;
  mime: string;
  size: number;
  alt: string | null;
  folder: string;
  uploaded_by: string;
  created_at: string;
};

function nowIso() {
  return new Date().toISOString();
}

function mapRow(row: MediaRow): MediaAsset {
  return {
    id: row.id,
    filename: row.filename,
    url: row.url,
    mime: row.mime,
    size: row.size,
    alt: row.alt,
    folder: row.folder,
    uploadedBy: row.uploaded_by,
    createdAt: row.created_at,
  };
}

function ensureMediaTable() {
  getDb().exec(`
    CREATE TABLE IF NOT EXISTS cms_media (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      url TEXT NOT NULL,
      mime TEXT NOT NULL,
      size INTEGER NOT NULL,
      alt TEXT,
      folder TEXT NOT NULL DEFAULT 'uploads',
      uploaded_by TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_cms_media_created_at
      ON cms_media(created_at DESC);
  `);
}

function folderForDate(date = new Date()) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${year}/${month}`;
}

export function listMediaAssets(limit = 100): MediaAsset[] {
  ensureMediaTable();

  const rows = getDb()
    .prepare(
      `SELECT id, filename, url, mime, size, alt, folder, uploaded_by, created_at
         FROM cms_media
        ORDER BY created_at DESC
        LIMIT ?`,
    )
    .all(limit) as MediaRow[];

  return rows.map(mapRow);
}

export async function saveMediaUpload(input: {
  file: File;
  uploadedBy: string;
  alt?: string | null;
}): Promise<MediaAsset> {
  ensureMediaTable();

  const folder = folderForDate();
  const ext = path.extname(input.file.name).toLowerCase();
  const safeStem = sanitiseFilename(path.basename(input.file.name, ext));
  const storedName = `${safeStem}-${randomUUID().slice(0, 8)}${ext}`;
  const relativeFolder = path.posix.join("media", folder);
  const absoluteDir = path.join(MEDIA_ROOT, folder);
  const absolutePath = path.join(absoluteDir, storedName);

  fs.mkdirSync(absoluteDir, { recursive: true });

  const buffer = Buffer.from(await input.file.arrayBuffer());
  fs.writeFileSync(absolutePath, buffer);

  const id = randomUUID();
  const createdAt = nowIso();
  const url = `/${relativeFolder}/${storedName}`.replace(/\\/g, "/");

  getDb()
    .prepare(
      `INSERT INTO cms_media
        (id, filename, url, mime, size, alt, folder, uploaded_by, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      id,
      storedName,
      url,
      input.file.type,
      input.file.size,
      input.alt?.trim() || null,
      folder,
      input.uploadedBy,
      createdAt,
    );

  return {
    id,
    filename: storedName,
    url,
    mime: input.file.type,
    size: input.file.size,
    alt: input.alt?.trim() || null,
    folder,
    uploadedBy: input.uploadedBy,
    createdAt,
  };
}

export function deleteMediaAsset(id: string) {
  ensureMediaTable();

  const row = getDb()
    .prepare(
      `SELECT id, filename, url, mime, size, alt, folder, uploaded_by, created_at
         FROM cms_media
        WHERE id = ?`,
    )
    .get(id) as MediaRow | undefined;

  if (!row) throw new Error("MEDIA_NOT_FOUND");

  const absolutePath = path.join(MEDIA_ROOT, row.folder, row.filename);

  getDb().prepare("DELETE FROM cms_media WHERE id = ?").run(id);

  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }

  return mapRow(row);
}

export function updateMediaAssetAlt(id: string, alt: string | null): MediaAsset {
  ensureMediaTable();

  const existing = getMediaAsset(id);
  if (!existing) throw new Error("MEDIA_NOT_FOUND");

  getDb().prepare("UPDATE cms_media SET alt = ? WHERE id = ?").run(alt?.trim() || null, id);

  return getMediaAsset(id)!;
}

export function getMediaAsset(id: string): MediaAsset | null {
  ensureMediaTable();

  const row = getDb()
    .prepare(
      `SELECT id, filename, url, mime, size, alt, folder, uploaded_by, created_at
         FROM cms_media
        WHERE id = ?`,
    )
    .get(id) as MediaRow | undefined;

  return row ? mapRow(row) : null;
}
