#!/usr/bin/env node
/**
 * List app members that already have a KCC user id (read-only DB query).
 * Loads `.env.local` from the repo root when present.
 *
 * Usage: node tools/admin-users/find-kcc-users.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const ROOT = process.cwd();

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const mysql = require(path.join(ROOT, "tools/db-inspect/node_modules/mysql2/promise"));

const cfg = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME ?? "app_numforlife_com",
  connectTimeout: 15000,
};

if (!cfg.host || !cfg.user || !cfg.password) {
  console.error("Missing DB_HOST / DB_USER / DB_PASS in environment or .env.local");
  process.exit(1);
}

const conn = await mysql.createConnection(cfg);
const [rows] = await conn.query(
  `SELECT id, kcc_user_id, email, nickname
     FROM yzn_member
    WHERE kcc_user_id IS NOT NULL
      AND TRIM(kcc_user_id) <> ''
    ORDER BY id
    LIMIT 20`,
);

await conn.end();

console.log(JSON.stringify(rows, null, 2));
