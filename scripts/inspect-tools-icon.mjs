import fs from "fs";

const html = fs.readFileSync("temp-home.html", "utf8");
const start = html.indexOf("数易赋能生态圈");
const end = html.indexOf("SEE RESULTS", start);
const section = html.slice(start, end);

const boxes = section.split("elementor-widget-icon-box").slice(1);
console.log("icon boxes:", boxes.length);

boxes.forEach((box, i) => {
  const titleMatch = box.match(/elementor-icon-box-title[^>]*>([^<]+)/);
  const title = titleMatch?.[1]?.trim() ?? "?";
  const pngMatch = box.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/);
  const size = pngMatch ? Buffer.from(pngMatch[1], "base64").length : 0;
  console.log(`${i}: ${title} -> png ${size} bytes`);
});

// Check 4.png alpha/content
const png = fs.readFileSync("public/icons/ecosystem/4.png");
const w = png.readUInt32BE(16);
const h = png.readUInt32BE(20);
console.log(`\n4.png: ${w}x${h}, ${png.length} bytes`);
