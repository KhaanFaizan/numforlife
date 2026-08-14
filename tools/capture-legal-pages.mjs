/**
 * One-off capture of legal page content from live WordPress.
 * Run: node tools/capture-legal-pages.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "lib", "legal", "content");

const PAGES = [
  { slug: "privacy-policy", path: "/privacy-policy" },
  { slug: "refund-policy", path: "/refund-policy" },
  { slug: "shipping-policy", path: "/shipping-policy" },
  { slug: "accessibility-statement", path: "/accessibility-statement" },
  { slug: "%e4%bd%bf%e7%94%a8%e6%9d%a1%e6%ac%be", path: "/terms-of-use" },
];

function decodeHtml(text) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/\u200b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(html) {
  return decodeHtml(html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, " "));
}

function parseLegalHtml(html) {
  const blocks = [];
  const tokenRegex =
    /(<h2[^>]*elementor-heading-title[^>]*>[\s\S]*?<\/h2>|<div class="elementor-widget-container">[\s\S]*?<\/div>)/gi;

  let match;
  while ((match = tokenRegex.exec(html)) !== null) {
    const chunk = match[1];
    if (/elementor-heading-title/i.test(chunk)) {
      const title = stripTags(chunk.match(/>([\s\S]*?)<\/h2/i)?.[1] ?? "");
      if (title) blocks.push({ type: "heading", text: title });
      continue;
    }

    const inner = chunk.match(/elementor-widget-container">([\s\S]*?)<\/div>/i)?.[1] ?? "";
    const text = stripTags(inner);
    if (text.length > 20) blocks.push({ type: "paragraph", text });
  }

  return blocks;
}

async function fetchPage(slug) {
  const response = await fetch(
    `https://numforlife.com/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`,
  );
  if (!response.ok) throw new Error(`${slug} HTTP ${response.status}`);
  const rows = await response.json();
  if (!rows[0]) throw new Error(`${slug} not found`);
  return rows[0];
}

mkdirSync(outDir, { recursive: true });

for (const page of PAGES) {
  const wp = await fetchPage(page.slug);
  const title = decodeHtml(wp.title.rendered.replace(/<[^>]+>/g, ""));
  const blocks = parseLegalHtml(wp.content.rendered);
  const payload = {
    title,
    path: page.path,
    wpSlug: page.slug,
    capturedAt: new Date().toISOString().slice(0, 10),
    blocks,
  };

  const fileName = page.path.replace(/^\//, "").replace(/-/g, "_") + ".json";
  writeFileSync(join(outDir, fileName), JSON.stringify(payload, null, 2), "utf8");
  console.log(`Wrote ${fileName} (${blocks.length} blocks, title=${title})`);
}

console.log("Done.");
