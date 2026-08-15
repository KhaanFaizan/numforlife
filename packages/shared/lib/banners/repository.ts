import "server-only";

import { randomUUID } from "node:crypto";

import { getDb } from "@/lib/cms/db";
import type { SiteBanner, SiteBannerInput } from "./types";

type BannerRow = {
  id: string;
  title: string;
  message: string;
  href: string | null;
  cta_label: string | null;
  variant: string;
  enabled: number;
  priority: number;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
};

function nowIso() {
  return new Date().toISOString();
}

function mapRow(row: BannerRow): SiteBanner {
  return {
    id: row.id,
    title: row.title,
    message: row.message,
    href: row.href,
    ctaLabel: row.cta_label,
    variant: row.variant as SiteBanner["variant"],
    enabled: Boolean(row.enabled),
    priority: row.priority,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function ensureBannerTable() {
  getDb().exec(`
    CREATE TABLE IF NOT EXISTS cms_banners (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      href TEXT,
      cta_label TEXT,
      variant TEXT NOT NULL DEFAULT 'info'
        CHECK(variant IN ('info', 'promo', 'warning')),
      enabled INTEGER NOT NULL DEFAULT 1,
      priority INTEGER NOT NULL DEFAULT 0,
      starts_at TEXT,
      ends_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_cms_banners_enabled_priority
      ON cms_banners(enabled, priority DESC, updated_at DESC);
  `);
}

function isWithinSchedule(row: BannerRow, at = new Date()) {
  const time = at.getTime();

  if (row.starts_at) {
    const starts = Date.parse(row.starts_at);
    if (!Number.isNaN(starts) && time < starts) return false;
  }

  if (row.ends_at) {
    const ends = Date.parse(row.ends_at);
    if (!Number.isNaN(ends) && time > ends) return false;
  }

  return true;
}

export function listSiteBanners(): SiteBanner[] {
  ensureBannerTable();

  const rows = getDb()
    .prepare(
      `SELECT id, title, message, href, cta_label, variant, enabled, priority,
              starts_at, ends_at, created_at, updated_at
         FROM cms_banners
        ORDER BY priority DESC, updated_at DESC`,
    )
    .all() as BannerRow[];

  return rows.map(mapRow);
}

export function listActiveSiteBanners(limit = 3): SiteBanner[] {
  ensureBannerTable();

  const rows = getDb()
    .prepare(
      `SELECT id, title, message, href, cta_label, variant, enabled, priority,
              starts_at, ends_at, created_at, updated_at
         FROM cms_banners
        WHERE enabled = 1
        ORDER BY priority DESC, updated_at DESC`,
    )
    .all() as BannerRow[];

  return rows.filter((row) => isWithinSchedule(row)).slice(0, limit).map(mapRow);
}

export function createSiteBanner(input: SiteBannerInput): SiteBanner {
  ensureBannerTable();

  const id = randomUUID();
  const createdAt = nowIso();
  const title = input.title.trim();
  const message = input.message.trim();

  if (!title || !message) {
    throw new Error("BANNER_TITLE_AND_MESSAGE_REQUIRED");
  }

  getDb()
    .prepare(
      `INSERT INTO cms_banners
        (id, title, message, href, cta_label, variant, enabled, priority,
         starts_at, ends_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      id,
      title,
      message,
      input.href?.trim() || null,
      input.ctaLabel?.trim() || null,
      input.variant ?? "info",
      input.enabled === false ? 0 : 1,
      input.priority ?? 0,
      input.startsAt ?? null,
      input.endsAt ?? null,
      createdAt,
      createdAt,
    );

  return getSiteBanner(id)!;
}

export function getSiteBanner(id: string): SiteBanner | null {
  ensureBannerTable();

  const row = getDb()
    .prepare(
      `SELECT id, title, message, href, cta_label, variant, enabled, priority,
              starts_at, ends_at, created_at, updated_at
         FROM cms_banners
        WHERE id = ?`,
    )
    .get(id) as BannerRow | undefined;

  return row ? mapRow(row) : null;
}

export function updateSiteBanner(id: string, input: SiteBannerInput): SiteBanner {
  ensureBannerTable();

  const existing = getSiteBanner(id);
  if (!existing) throw new Error("BANNER_NOT_FOUND");

  const updatedAt = nowIso();
  const title = input.title?.trim() || existing.title;
  const message = input.message?.trim() || existing.message;

  getDb()
    .prepare(
      `UPDATE cms_banners
          SET title = ?,
              message = ?,
              href = ?,
              cta_label = ?,
              variant = ?,
              enabled = ?,
              priority = ?,
              starts_at = ?,
              ends_at = ?,
              updated_at = ?
        WHERE id = ?`,
    )
    .run(
      title,
      message,
      input.href === undefined ? existing.href : input.href?.trim() || null,
      input.ctaLabel === undefined ? existing.ctaLabel : input.ctaLabel?.trim() || null,
      input.variant ?? existing.variant,
      input.enabled === undefined ? (existing.enabled ? 1 : 0) : input.enabled ? 1 : 0,
      input.priority ?? existing.priority,
      input.startsAt === undefined ? existing.startsAt : input.startsAt,
      input.endsAt === undefined ? existing.endsAt : input.endsAt,
      updatedAt,
      id,
    );

  return getSiteBanner(id)!;
}

export function deleteSiteBanner(id: string): SiteBanner {
  const existing = getSiteBanner(id);
  if (!existing) throw new Error("BANNER_NOT_FOUND");

  getDb().prepare("DELETE FROM cms_banners WHERE id = ?").run(id);
  return existing;
}
