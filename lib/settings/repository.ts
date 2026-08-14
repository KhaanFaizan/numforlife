import "server-only";

import fs from "node:fs";
import path from "node:path";

import { getDb } from "@/lib/cms/db";
import {
  DEFAULT_SITE_FLAGS,
  SITE_FLAG_DEFINITIONS,
  type SiteFlagKey,
  type SiteFlags,
} from "./flags";

const FLAGS_MANIFEST = path.join(process.cwd(), "public", "site-flags.json");

function nowIso() {
  return new Date().toISOString();
}

function ensureSettingsTable() {
  getDb().exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value_json TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      updated_by TEXT
    );
  `);
}

function writeFlagsManifest(flags: SiteFlags) {
  fs.mkdirSync(path.dirname(FLAGS_MANIFEST), { recursive: true });
  fs.writeFileSync(
    FLAGS_MANIFEST,
    `${JSON.stringify({ flags, updatedAt: nowIso() }, null, 2)}\n`,
    "utf8",
  );
}

export function getSiteFlags(): SiteFlags {
  ensureSettingsTable();

  const rows = getDb()
    .prepare("SELECT key, value_json FROM site_settings WHERE key LIKE 'flag:%'")
    .all() as Array<{ key: string; value_json: string }>;

  const flags: SiteFlags = { ...DEFAULT_SITE_FLAGS };

  for (const row of rows) {
    const flagKey = row.key.replace(/^flag:/, "") as SiteFlagKey;
    if (!(flagKey in flags)) continue;

    try {
      flags[flagKey] = Boolean(JSON.parse(row.value_json));
    } catch {
      // Keep default when corrupt.
    }
  }

  return flags;
}

export function updateSiteFlags(
  input: Partial<SiteFlags>,
  updatedBy: string,
): SiteFlags {
  ensureSettingsTable();

  const current = getSiteFlags();
  const next: SiteFlags = { ...current };
  const updatedAt = nowIso();

  const upsert = getDb().prepare(
    `INSERT INTO site_settings (key, value_json, updated_at, updated_by)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(key) DO UPDATE SET
       value_json = excluded.value_json,
       updated_at = excluded.updated_at,
       updated_by = excluded.updated_by`,
  );

  const tx = getDb().transaction(() => {
    for (const definition of SITE_FLAG_DEFINITIONS) {
      if (input[definition.key] === undefined) continue;
      next[definition.key] = Boolean(input[definition.key]);
      upsert.run(
        `flag:${definition.key}`,
        JSON.stringify(next[definition.key]),
        updatedAt,
        updatedBy,
      );
    }
  });

  tx();
  writeFlagsManifest(next);
  return next;
}

export function listSiteFlagDefinitions() {
  return SITE_FLAG_DEFINITIONS.map((definition) => ({
    ...definition,
    value: getSiteFlags()[definition.key],
  }));
}
