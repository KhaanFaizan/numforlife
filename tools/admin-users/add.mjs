#!/usr/bin/env node
/**
 * Register an admin user in the local SQLite database.
 *
 * Usage:
 *   node tools/admin-users/add.mjs <kcc_user_id> <email> [role]
 *
 * Roles: super_admin | content_editor | marketing_admin | support_admin |
 *        developer_admin | read_only_admin
 */

import { randomUUID } from "node:crypto";
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const [, , kccUserId, email, role = "super_admin"] = process.argv;

if (!kccUserId || !email) {
  console.error("Usage: node tools/admin-users/add.mjs <kcc_user_id> <email> [role]");
  process.exit(1);
}

const dbPath = process.env.CMS_DATABASE_PATH ?? path.join(process.cwd(), "data", "numforlife_web.sqlite");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma("foreign_keys = ON");

db.exec(`
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
`);

const now = new Date().toISOString();
const existing = db
  .prepare("SELECT id FROM admin_users WHERE kcc_user_id = ?")
  .get(kccUserId);

if (existing) {
  db.prepare("UPDATE admin_users SET email = ?, role = ?, updated_at = ? WHERE kcc_user_id = ?")
    .run(email, role, now, kccUserId);
  console.log(`Updated admin user ${kccUserId} (${role})`);
} else {
  db.prepare(
    `INSERT INTO admin_users
      (id, kcc_user_id, email, role, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, 'active', ?, ?)`,
  ).run(randomUUID(), kccUserId, email, role, now, now);
  console.log(`Created admin user ${kccUserId} (${role})`);
}
