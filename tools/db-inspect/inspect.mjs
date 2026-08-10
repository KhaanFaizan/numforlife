/**
 * Read-only schema inspection for the Shuyi / NumForLife app database.
 *
 * Credentials come from the environment ONLY — never hardcode them, never commit them.
 *   DB_HOST=43.156.19.185 DB_USER=... DB_PASS=... node tools/db-inspect/inspect.mjs
 *
 * The supplied account is read-only and this script issues SELECT/SHOW statements only.
 * Output is a schema map written to tools/db-inspect/schema-report.json — it deliberately
 * records COLUMN STRUCTURE and ROW COUNTS, not personal data.
 */

import mysql from "mysql2/promise";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));

const cfg = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME ?? "app_numforlife_com",
  connectTimeout: 15000,
};

if (!cfg.host || !cfg.user || !cfg.password) {
  console.error("Missing DB_HOST / DB_USER / DB_PASS environment variables.");
  process.exit(1);
}

/** Tables whose columns are most relevant to the PRD's website + dashboard scope. */
const INTEREST = [
  /user/i,
  /member/i,
  /vip/i,
  /order/i,
  /pay/i,
  /kcc/i,
  /record/i,
  /calc/i,
  /number/i,
  /name/i,
  /tarot/i,
  /rutor|tutor|mentor/i,
  /purview|permission|right/i,
  /credit|point|energy/i,
  /ads?$|banner/i,
];

const isInteresting = (t) => INTEREST.some((re) => re.test(t));

async function main() {
  const conn = await mysql.createConnection(cfg);
  console.log(`connected: ${cfg.user}@${cfg.host}:${cfg.port}/${cfg.database}\n`);

  const [verRows] = await conn.query("SELECT VERSION() AS v");
  console.log("server version:", verRows[0].v);

  // --- table inventory ------------------------------------------------------
  const [tables] = await conn.query(
    `SELECT TABLE_NAME, TABLE_ROWS, ENGINE, TABLE_COMMENT
       FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = ?
      ORDER BY TABLE_NAME`,
    [cfg.database],
  );
  console.log(`tables: ${tables.length}\n`);

  const report = { database: cfg.database, generatedAt: new Date().toISOString(), tables: {} };

  const focus = tables.filter((t) => isInteresting(t.TABLE_NAME));
  console.log(`=== TABLE INVENTORY (${tables.length}) ===`);
  for (const t of tables) {
    const mark = isInteresting(t.TABLE_NAME) ? "*" : " ";
    console.log(
      `${mark} ${t.TABLE_NAME.padEnd(42)} ~${String(t.TABLE_ROWS ?? 0).padStart(8)} rows` +
        (t.TABLE_COMMENT ? `  // ${t.TABLE_COMMENT}` : ""),
    );
  }

  // --- columns for tables of interest --------------------------------------
  console.log(`\n\n=== COLUMNS FOR ${focus.length} TABLES OF INTEREST ===`);
  for (const t of focus) {
    const [cols] = await conn.query(
      `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_KEY, COLUMN_COMMENT
         FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
        ORDER BY ORDINAL_POSITION`,
      [cfg.database, t.TABLE_NAME],
    );
    report.tables[t.TABLE_NAME] = {
      approxRows: t.TABLE_ROWS,
      comment: t.TABLE_COMMENT || null,
      columns: cols.map((c) => ({
        name: c.COLUMN_NAME,
        type: c.COLUMN_TYPE,
        nullable: c.IS_NULLABLE === "YES",
        key: c.COLUMN_KEY || null,
        comment: c.COLUMN_COMMENT || null,
      })),
    };

    console.log(`\n--- ${t.TABLE_NAME}  (~${t.TABLE_ROWS ?? 0} rows) ---`);
    for (const c of cols) {
      console.log(
        `    ${c.COLUMN_NAME.padEnd(30)} ${c.COLUMN_TYPE.padEnd(24)}` +
          `${(c.COLUMN_KEY || "").padEnd(4)}${c.COLUMN_COMMENT ? "// " + c.COLUMN_COMMENT : ""}`,
      );
    }
  }

  fs.writeFileSync(
    path.join(HERE, "schema-report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(`\n\nwrote schema-report.json (${focus.length} tables detailed)`);

  await conn.end();
}

main().catch((e) => {
  console.error("FAILED:", e.code || "", e.message);
  process.exit(1);
});
