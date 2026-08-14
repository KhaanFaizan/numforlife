/**
 * Parses a rendered numerology result into our typed shape.
 *
 * Every selector here was derived by inspecting real production output, not
 * guessed. The same extraction logic backs `tools/calc-capture/capture.mjs`,
 * which produced the golden-master fixtures, so parser and fixtures cannot drift
 * apart silently.
 */

import type { AnalysisGroup, ElementTable, NumerologyResult } from "../types";

const CATEGORIES = ["自身性格", "子女财富", "事业伴侣", "官鬼疾病", "父母贵人"];

function sliceBetween(html: string, startMarker: string, endMarker: string) {
  const start = html.indexOf(startMarker);
  if (start < 0) return "";
  const end = html.indexOf(endMarker, start);
  return html.slice(start, end > start ? end : undefined);
}

function stripTags(value: string) {
  return value.replace(/<[^>]+>/g, "").trim();
}

/** Pyramid digits, stars and the date decomposition all live in SVG <text> nodes. */
function parsePyramid(html: string) {
  const segment = sliceBetween(html, 'id="tab1"', 'id="tab2"');
  const nodes = [...segment.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map((m) =>
    stripTags(m[1]),
  );

  return {
    pyramidDigits: nodes.filter((n) => /^\d$/.test(n)),
    dateParts: nodes.filter((n) => /^\d{2}$/.test(n)),
    starCount: nodes.filter((n) => n === "★").length,
  };
}

/**
 * The five-element table.
 *
 * `<thead align="center">` carries attributes, so the opening tag must be matched
 * permissively — a bare `<thead>` pattern silently matches nothing.
 */
function parseElementTable(html: string): ElementTable | null {
  const table = html.match(
    /<thead[^>]*>[\s\S]*?自身性格[\s\S]*?<\/thead>\s*<tbody[^>]*>([\s\S]*?)<\/tbody>/,
  );
  if (!table) return null;

  const rows = [...table[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((row) =>
    [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((cell) => stripTags(cell[1])),
  );
  if (rows.length < 2 || rows[0].length !== 5 || rows[1].length !== 5) return null;

  const headers = [
    ...(html.match(/<thead[^>]*>([\s\S]*?)<\/thead>/)?.[1].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g) ??
      []),
  ].map((m) => stripTags(m[1]));

  return {
    categories: headers.length === 5 ? headers : CATEGORIES,
    // Order-sensitive: production rotates the element sequence per birth date.
    elements: rows[0],
    values: rows[1].map(Number),
  };
}

/** Analysis groups render as buttons: `<button … data-target="panel3581"> 父基因 358 </button>`. */
function parseGroups(html: string): AnalysisGroup[] {
  const groups: AnalysisGroup[] = [];
  const seen = new Set<string>();

  for (const match of html.matchAll(
    /<button[^>]*class="[^"]*myBtn[^"]*"[^>]*data-target="([^"]+)"[^>]*>([\s\S]*?)<\/button>/g,
  )) {
    const inner = match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const parts = inner.match(/^(.*?)\s+(\d{3})$/);
    if (!parts) continue;

    const key = `${match[1]}:${inner}`;
    if (seen.has(key)) continue;
    seen.add(key);

    groups.push({ label: parts[1].trim(), value: parts[2] });
  }

  return groups;
}

export function parseNumerologyHtml(html: string): NumerologyResult | null {
  const personality = html.match(/(\d+)\s*号人/);
  // No personality number means no result was rendered — a validation failure or
  // a gate, not a parse bug. The caller decides how to surface that.
  if (!personality) return null;

  const { pyramidDigits, dateParts, starCount } = parsePyramid(html);

  return {
    personalityNumber: Number(personality[1]),
    pyramidDigits,
    dateParts,
    starCount,
    elementTable: parseElementTable(html),
    groups: parseGroups(html),
  };
}
