import fs from "fs";

const html = fs.readFileSync("temp-home.html", "utf8");
const start = html.indexOf("数易赋能生态圈");
const end = html.indexOf("SEE RESULTS", start);
const section = html.slice(start, end);

const parts = section.split("elementor-widget-icon-box").slice(1);

parts.forEach((part, i) => {
  const titleMatch = part.match(
    /elementor-icon-box-title[\s\S]*?<span[^>]*>\s*([^<]+)/,
  );
  const title = titleMatch?.[1]?.replace(/\u200b/g, "").trim() ?? "?";
  const pngMatch = part.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/);
  const pngSize = pngMatch ? Buffer.from(pngMatch[1], "base64").length : 0;

  if (pngMatch) {
    fs.writeFileSync(
      `public/icons/ecosystem/_widget${i + 1}.png`,
      Buffer.from(pngMatch[1], "base64"),
    );
  }

  console.log(`${i + 1}. ${title} -> ${pngSize} bytes`);
});

console.log("\nWrote _widget1..6.png for visual comparison");
