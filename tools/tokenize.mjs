/**
 * One-off migration: convert hardcoded Tailwind colours in the public components
 * to the semantic design tokens introduced in globals.css.
 *
 * Context matters, so the rules are ordered most-specific-first:
 *   - `text-black` sitting on `bg-accent` means "text on gold"  -> text-accent-fg
 *   - `text-black` inside a white panel means "primary text"    -> text-fg
 *   - `bg-white` panels were a design inversion in the dark-only demo -> bg-surface
 *
 * Deliberately NOT converted: logo/QR plates, which must stay white in both
 * themes because the artwork is designed for a white ground. Those are handled
 * by hand after this runs.
 *
 * Safe to delete once the migration is verified.
 */
import fs from "node:fs";
import path from "node:path";

const ROOTS = [
  "components/sections",
  "components/ui",
  "components/layout",
  "components/home",
];

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (p.endsWith(".tsx")) files.push(p.split(path.sep).join("/"));
  }
}
for (const r of ROOTS) if (fs.existsSync(r)) walk(r);

const rules = [
  // Utility classes removed from globals.css
  [/focus-accent-light/g, "focus-accent"],
  [/glass-panel-dark/g, "glass-panel"],

  // Text sitting ON the gold accent
  [/bg-accent([^"']*?)\stext-black\b/g, "bg-accent$1 text-accent-fg"],

  // Alpha variants before base colours
  [/text-black\/(?:[1-4][0-9]|[1-9])\b/g, "text-fg-subtle"],
  [/text-black\/(?:[5-9][0-9])\b/g, "text-fg-muted"],
  [/text-white\/(?:[1-4][0-9]|[1-9])\b/g, "text-fg-subtle"],
  [/text-white\/(?:[5-9][0-9])\b/g, "text-fg-muted"],
  [/border-black\/[0-9]+\b/g, "border-border"],
  [/border-white\/[0-9]+\b/g, "border-border"],
  [/bg-black\/([0-9]+)\b/g, "bg-bg/$1"],
  [/bg-white\/([0-9]+)\b/g, "bg-surface/$1"],

  // Base colours
  [/\btext-white\b/g, "text-fg"],
  [/\btext-black\b/g, "text-fg"],
  [/\bbg-black\b/g, "bg-bg"],
  [/\bbg-white\b/g, "bg-surface"],
  [/\bborder-black\b/g, "border-border-strong"],
  [/\bborder-white\b/g, "border-border-strong"],
];

let changed = 0;
for (const file of files) {
  const before = fs.readFileSync(file, "utf8");
  let after = before;
  for (const [re, to] of rules) after = after.replace(re, to);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
    console.log("  converted", file);
  }
}
console.log(`\n${changed} file(s) converted of ${files.length} scanned`);
