import "server-only";

import fs from "node:fs";
import path from "node:path";

import Database from "better-sqlite3";
import { cmsDatabasePath } from "@/lib/deployment/paths";

let db: Database.Database | null = null;

function migrate(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS cms_pages (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      template TEXT NOT NULL DEFAULT 'homepage',
      status TEXT NOT NULL DEFAULT 'published',
      published_version_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cms_page_versions (
      id TEXT PRIMARY KEY,
      page_id TEXT NOT NULL REFERENCES cms_pages(id) ON DELETE CASCADE,
      version_no INTEGER NOT NULL,
      content_json TEXT NOT NULL,
      seo_json TEXT,
      state TEXT NOT NULL CHECK(state IN ('draft', 'published', 'archived')),
      created_at TEXT NOT NULL,
      UNIQUE(page_id, version_no)
    );

    CREATE INDEX IF NOT EXISTS idx_cms_versions_page_state
      ON cms_page_versions(page_id, state);

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      kcc_user_id TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL,
      role TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active'
        CHECK(status IN ('active', 'suspended')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_admin_users_kcc_user_id
      ON admin_users(kcc_user_id);

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      admin_kcc_user_id TEXT NOT NULL,
      admin_email TEXT NOT NULL,
      admin_role TEXT NOT NULL,
      action TEXT NOT NULL,
      module TEXT NOT NULL,
      target TEXT,
      before_json TEXT,
      after_json TEXT,
      reason TEXT,
      ip TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at
      ON audit_logs(created_at DESC);
  `);

  const pageColumns = database.prepare("PRAGMA table_info(cms_pages)").all() as Array<{
    name: string;
  }>;

  if (!pageColumns.some((column) => column.name === "draft_version_id")) {
    database.exec("ALTER TABLE cms_pages ADD COLUMN draft_version_id TEXT");
  }
}

/** Singleton SQLite connection for the website CMS schema. */
export function getDb(): Database.Database {
  if (db) return db;

  const dbPath = cmsDatabasePath();
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  migrate(db);

  return db;
}
