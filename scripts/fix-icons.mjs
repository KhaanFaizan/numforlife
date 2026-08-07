import fs from "fs";

const html = fs.readFileSync("temp-home.html", "utf8");
const start = html.indexOf("数易赋能生态圈");
const end = html.indexOf("SEE RESULTS", start);
const section = html.slice(start, end);

const parts = section.split("elementor-widget-icon-box").slice(1);

fs.mkdirSync("public/icons/ecosystem", { recursive: true });

parts.forEach((part, index) => {
  const titleMatch = part.match(
    /elementor-icon-box-title[\s\S]*?<span[^>]*>\s*([^<]+)/,
  );
  const title = titleMatch?.[1]?.replace(/\u200b/g, "").trim() ?? "?";
  const pngMatch = part.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/);

  if (!pngMatch) {
    console.warn(`Missing PNG for widget ${index + 1} (${title})`);
    return;
  }

  const buffer = Buffer.from(pngMatch[1], "base64");
  const file = `${index + 1}.png`;
  fs.writeFileSync(`public/icons/ecosystem/${file}`, buffer);
  console.log(`${file} (${buffer.length}) - ${title}`);
});
