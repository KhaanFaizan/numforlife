/**
 * Numerology calculator — regression fixture capture harness.
 *
 * WHY THIS EXISTS
 * ---------------
 * The production numerology algorithm lives ONLY inside a WordPress PHP snippet on
 * https://numforlife.com/member-number-simulate/ (confirmed by the client: "there is no
 * calculation API"). When WordPress is decommissioned that implementation disappears.
 *
 * This harness captures the CURRENT, LIVE behaviour as structured fixtures so the port can be
 * verified against real production output rather than against our interpretation of it.
 *
 * It is READ-ONLY: it submits the same public form a visitor submits. It writes nothing to the
 * client's systems and stores no credentials.
 *
 * USAGE
 *   node tools/calc-capture/capture.mjs            # capture the standard matrix
 *   node tools/calc-capture/capture.mjs --keep-raw # also retain raw HTML for diffing
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(HERE, "..", "..", "tests", "fixtures", "numerology");
const RAW_DIR = path.join(HERE, "raw");
const ENDPOINT = "https://numforlife.com/member-number-simulate/";
const KEEP_RAW = process.argv.includes("--keep-raw");

/** Politeness delay between requests to the client's production site. */
const DELAY_MS = 1500;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Input matrix. Covers every branch exposed by the production form:
 *  - twin = n                     -> base case
 *  - twin = y + big               -> requires father's DOB
 *  - twin = y + small             -> requires mother's DOB
 *  - calculation modes            -> 普通 / 流日 / 流月 / 流年
 *  - boundary dates               -> leap day, year ends, single-digit month/day
 */
const MATRIX = [
  { id: "base-1990-05-12", body: { date: "1990-05-12", twin: "n", countbtn: "1" } },
  { id: "base-1988-11-03", body: { date: "1988-11-03", twin: "n", countbtn: "1" } },
  { id: "base-2000-01-01", body: { date: "2000-01-01", twin: "n", countbtn: "1" } },
  { id: "base-1999-12-31", body: { date: "1999-12-31", twin: "n", countbtn: "1" } },
  { id: "leap-2004-02-29", body: { date: "2004-02-29", twin: "n", countbtn: "1" } },
  { id: "single-digit-1975-07-08", body: { date: "1975-07-08", twin: "n", countbtn: "1" } },
  { id: "recent-2015-09-21", body: { date: "2015-09-21", twin: "n", countbtn: "1" } },
  {
    id: "twin-big-1992-03-15",
    body: { date: "1992-03-15", twin: "y", big: "big", "f-date": "1965-08-22", countbtn: "1" },
  },
  {
    id: "twin-small-1992-03-15",
    body: { date: "1992-03-15", twin: "y", big: "small", "m-date": "1968-04-11", countbtn: "1" },
  },
  { id: "mode-day-1990-05-12", body: { date: "1990-05-12", twin: "n", type_day: "1" } },
  { id: "mode-month-1990-05-12", body: { date: "1990-05-12", twin: "n", type_month: "1" } },
  { id: "mode-year-1990-05-12", body: { date: "1990-05-12", twin: "n", type_year: "1" } },
];

const stripTags = (s) =>
  s
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/+/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** Split the flattened text on the tag sentinel into clean tokens. */
const tokens = (s) =>
  stripTags(s)
    .split("")
    .map((t) => t.trim())
    .filter(Boolean);

/**
 * Extract the structured result from the rendered HTML.
 * Everything here is derived from the live DOM, not assumed.
 */
function extract(html) {
  const out = {};

  // --- Tab 1: 数字排列图 (SVG pyramid) -------------------------------------
  const t1Start = html.indexOf('id="tab1"');
  const t2Start = html.indexOf('id="tab2"');
  const t3Start = html.indexOf('id="tab3"');

  if (t1Start >= 0 && t2Start > t1Start) {
    const seg = html.slice(t1Start, t2Start);
    // SVG <text> nodes carry the pyramid digits, the stars, the date decomposition
    // and the six derived digits, in document order.
    const nodes = [...seg.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map((m) =>
      m[1].replace(/<[^>]+>/g, "").trim(),
    );
    // Positioned digits let us assert layout, not just values.
    const positioned = [
      ...seg.matchAll(/<text[^>]*x="([\d.]+)"[^>]*y="([\d.]+)"[^>]*>([\s\S]*?)<\/text>/g),
    ].map((m) => ({ x: Number(m[1]), y: Number(m[2]), v: m[3].replace(/<[^>]+>/g, "").trim() }));

    out.pyramid = {
      textNodesInOrder: nodes,
      stars: nodes.filter((n) => n === "★").length,
      digits: nodes.filter((n) => /^\d$/.test(n)),
      dateParts: nodes.filter((n) => /^\d{2}$/.test(n)),
      positioned,
    };
  }

  // --- 五行 (five elements) + the five life categories ----------------------
  const CATEGORIES = ["自身性格", "子女财富", "事业伴侣", "官鬼疾病", "父母贵人"];
  const ELEMENTS = ["木", "火", "土", "金", "水"];

  const flat = tokens(html);

  // The five-element block is a <table>: the header row is the five life categories,
  // tbody row 1 is the element assigned to each category, tbody row 2 is its value.
  //
  // IMPORTANT: the element order ROTATES per birth date (e.g. 1990-05-12 -> 木火土金水,
  // 1999-12-31 -> 火土金水木). It is a positional category->element mapping, NOT a fixed
  // 木火土金水 count list. The port must reproduce the rotation, so we capture it structurally.
  {
    const tableMatch = html.match(
      /<thead[^>]*>[\s\S]*?自身性格[\s\S]*?<\/thead>\s*<tbody[^>]*>([\s\S]*?)<\/tbody>/,
    );
    if (tableMatch) {
      const rows = [...tableMatch[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) =>
        [...r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) =>
          c[1].replace(/<[^>]+>/g, "").trim(),
        ),
      );
      const headers = [
        ...(html
          .match(/<thead[^>]*>([\s\S]*?)<\/thead>/)?.[1]
          .matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g) ?? []),
      ].map((m) => m[1].replace(/<[^>]+>/g, "").trim());

      if (rows.length >= 2 && rows[0].length === 5 && rows[1].length === 5) {
        out.elementTable = {
          categories: headers.length === 5 ? headers : CATEGORIES,
          elements: rows[0],
          values: rows[1].map(Number),
          // Convenience view: element -> value, regardless of column order.
          byElement: Object.fromEntries(rows[0].map((e, n) => [e, Number(rows[1][n])])),
          elementOrder: rows[0].join(""),
        };
      }
    }
  }

  const catIdx = flat.indexOf("自身性格");
  if (catIdx >= 0 && flat.slice(catIdx, catIdx + 5).join("") === CATEGORIES.join("")) {
    // The six derived digits immediately precede the category labels in the SVG block.
    out.categories = CATEGORIES;
  }

  // --- Tab 2: 主性格运势 ----------------------------------------------------
  const personMatch = html.match(/(\d+)\s*号人/);
  if (personMatch) out.personalityNumber = Number(personMatch[1]);

  // --- 13组解析: label -> value pairs --------------------------------------
  // Rendered as: <button ... data-target="panel3581"> 父基因 358 </button>
  // The data-target encodes <value><ordinal>, which we keep so panel wiring can be verified too.
  {
    const groups = [];
    const seen = new Set();
    for (const m of html.matchAll(
      /<button[^>]*class="[^"]*myBtn[^"]*"[^>]*data-target="([^"]+)"[^>]*>\s*([\s\S]*?)\s*<\/button>/g,
    )) {
      const panel = m[1];
      const inner = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      const parts = inner.match(/^(.*?)\s+(\d{3})$/);
      if (!parts) continue;
      const key = `${panel}:${inner}`;
      if (seen.has(key)) continue;
      seen.add(key);
      groups.push({ label: parts[1].trim(), value: parts[2], panel });
    }
    if (groups.length) out.groups = groups;
  }

  // --- Gating / membership signals -----------------------------------------
  const text = stripTags(html).replace(//g, " ");
  out.signals = {
    anonLimitNotice: /未登录用户每日最多可进行/.test(text),
    notSavedNotice: /不会被记录或保存于数据库/.test(text),
    upgradeCta: /点我升级会员/.test(text),
    loginRequired: /请先登录/.test(text),
  };

  return out;
}

async function capture(entry) {
  const body = new URLSearchParams(entry.body).toString();
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0 (compatible; numforlife-migration-fixture-capture)",
      Accept: "text/html",
    },
    body,
  });
  const html = await res.text();

  if (KEEP_RAW) {
    fs.mkdirSync(RAW_DIR, { recursive: true });
    fs.writeFileSync(path.join(RAW_DIR, `${entry.id}.html`), html);
  }

  return {
    id: entry.id,
    input: entry.body,
    httpStatus: res.status,
    capturedAt: new Date().toISOString(),
    source: ENDPOINT,
    expected: extract(html),
  };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const fixtures = [];

  for (const entry of MATRIX) {
    process.stdout.write(`capturing ${entry.id} ... `);
    try {
      const fixture = await capture(entry);
      const ok = fixture.expected.personalityNumber != null;
      console.log(
        ok
          ? `ok (${fixture.expected.personalityNumber}号人, ${fixture.expected.groups?.length ?? 0} groups)`
          : "NO RESULT — check gating/rate limit",
      );
      fixtures.push(fixture);
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      fixtures.push({ id: entry.id, input: entry.body, error: String(err) });
    }
    await sleep(DELAY_MS);
  }

  const outFile = path.join(OUT_DIR, "production-baseline.json");
  fs.writeFileSync(
    outFile,
    JSON.stringify(
      {
        description:
          "Golden-master fixtures captured from the LIVE WordPress numerology calculator. " +
          "The ported implementation must reproduce `expected` exactly for each `input`.",
        source: ENDPOINT,
        capturedAt: new Date().toISOString(),
        fixtureCount: fixtures.length,
        fixtures,
      },
      null,
      2,
    ),
  );
  console.log(`\nwrote ${fixtures.length} fixtures -> ${path.relative(process.cwd(), outFile)}`);
}

main();
