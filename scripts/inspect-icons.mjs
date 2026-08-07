import fs from "fs";

const html = fs.readFileSync("temp-home.html", "utf8");
const ids = ["d1865ca", "b1fc0a8", "febbc9f", "7d0050e", "0c1e4c3", "c5b043f"];

for (const id of ids) {
  const start = html.indexOf(`elementor-element-${id}`);
  const end = html.indexOf("elementor-element-", start + 1);
  const block = html.slice(start, end > start ? end : start + 80000);

  const titleMatch = block.match(
    /elementor-icon-box-title[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/i,
  );
  const title = titleMatch
    ? titleMatch[1].replace(/<[^>]+>/g, "").trim()
    : "?";

  const imageIds = [...block.matchAll(/id="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((name) => name.includes("icon") || name.includes("Metal") || name.includes("wixagency") || name.includes("Generic"));

  const b64Count = (block.match(/data:image\/png;base64,/g) || []).length;

  console.log(`${id} | ${title} | images: ${b64Count} | ids: ${imageIds.join(", ")}`);
}
