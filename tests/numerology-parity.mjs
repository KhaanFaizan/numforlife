/**
 * Numerology parity check.
 *
 * Runs the live calculation engine over every captured production fixture and
 * asserts the typed result matches, field by field.
 *
 * This is the gate the native port must pass before it can replace the interim
 * upstream engine. Today it also protects the parser: if the upstream markup
 * changes shape, this fails loudly instead of quietly returning partial readings.
 *
 *   node tests/numerology-parity.mjs
 *
 * Note it makes real requests to the production calculator, so it is deliberately
 * a script rather than part of a unit-test run.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES = path.join(HERE, "fixtures", "numerology", "production-baseline.json");
const ENDPOINT =
  process.env.NUMEROLOGY_UPSTREAM_URL ??
  "https://numforlife.com/member-number-simulate/";

const { fixtures } = JSON.parse(fs.readFileSync(FIXTURES, "utf8"));

const stripTags = (v) => v.replace(/<[^>]+>/g, "").trim();
const sliceBetween = (html, a, b) => {
  const start = html.indexOf(a);
  if (start < 0) return "";
  const end = html.indexOf(b, start);
  return html.slice(start, end > start ? end : undefined);
};

/** Mirrors lib/calculators/numerology/parse.ts. */
function parse(html) {
  const personality = html.match(/(\d+)\s*号人/);
  if (!personality) return null;

  const seg = sliceBetween(html, 'id="tab1"', 'id="tab2"');
  const nodes = [...seg.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map((m) => stripTags(m[1]));

  const table = html.match(
    /<thead[^>]*>[\s\S]*?自身性格[\s\S]*?<\/thead>\s*<tbody[^>]*>([\s\S]*?)<\/tbody>/,
  );
  let elementTable = null;
  if (table) {
    const rows = [...table[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) =>
      [...r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => stripTags(c[1])),
    );
    if (rows.length >= 2 && rows[0].length === 5 && rows[1].length === 5) {
      elementTable = { elements: rows[0], values: rows[1].map(Number) };
    }
  }

  const groups = [];
  const seen = new Set();
  for (const m of html.matchAll(
    /<button[^>]*class="[^"]*myBtn[^"]*"[^>]*data-target="([^"]+)"[^>]*>([\s\S]*?)<\/button>/g,
  )) {
    const inner = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const parts = inner.match(/^(.*?)\s+(\d{3})$/);
    if (!parts) continue;
    const key = `${m[1]}:${inner}`;
    if (seen.has(key)) continue;
    seen.add(key);
    groups.push({ label: parts[1].trim(), value: parts[2] });
  }

  return {
    personalityNumber: Number(personality[1]),
    pyramidDigits: nodes.filter((n) => /^\d$/.test(n)),
    dateParts: nodes.filter((n) => /^\d{2}$/.test(n)),
    starCount: nodes.filter((n) => n === "★").length,
    elementTable,
    groups,
  };
}

const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let passed = 0;
const failures = [];

for (const fixture of fixtures) {
  const body = new URLSearchParams(fixture.input).toString();
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const actual = parse(await res.text());
  const expected = fixture.expected;

  const checks = [
    ["personalityNumber", actual?.personalityNumber, expected.personalityNumber],
    ["pyramidDigits", actual?.pyramidDigits, expected.pyramid?.digits],
    ["dateParts", actual?.dateParts, expected.pyramid?.dateParts],
    ["starCount", actual?.starCount, expected.pyramid?.stars],
    ["elements", actual?.elementTable?.elements, expected.elementTable?.elements],
    ["elementValues", actual?.elementTable?.values, expected.elementTable?.values],
    [
      "groups",
      actual?.groups?.map((g) => `${g.label}:${g.value}`),
      expected.groups?.map((g) => `${g.label}:${g.value}`),
    ],
  ];

  const bad = checks.filter(([, a, b]) => !eq(a, b));
  if (bad.length === 0) {
    passed += 1;
    console.log(`  PASS  ${fixture.id}`);
  } else {
    failures.push({ id: fixture.id, bad });
    console.log(`  FAIL  ${fixture.id}  (${bad.map(([f]) => f).join(", ")})`);
  }

  await sleep(1200);
}

console.log(`\n${passed}/${fixtures.length} fixtures matched production`);

if (failures.length) {
  console.log("\nMismatches:");
  for (const f of failures) {
    console.log(`\n  ${f.id}`);
    for (const [field, actual, expected] of f.bad) {
      console.log(`    ${field}\n      expected: ${JSON.stringify(expected)}\n      actual:   ${JSON.stringify(actual)}`);
    }
  }
  process.exit(1);
}
