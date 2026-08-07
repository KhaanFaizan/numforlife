import fs from "fs";

const html = fs.readFileSync("temp-home.html", "utf8");

const blocks = [
  { id: "d1865ca", file: "1.png", label: "divination-1 heart" },
  { id: "b1fc0a8", file: "2.png", label: "divination-2 crown" },
  { id: "febbc9f", file: "3.png", label: "knowledge speech" },
  { id: "7d0050e", file: "4.png", label: "tools airplane" },
  { id: "0c1e4c3", file: "5.png", label: "archive folder" },
  { id: "c5b043f", file: "6.png", label: "mentor user" },
];

function getIconBoxHtml(id) {
  const start = html.indexOf(`elementor-element-${id}`);
  const iconStart = html.indexOf("elementor-icon-box-icon", start);
  const contentStart = html.indexOf("elementor-icon-box-content", iconStart);
  return html.slice(iconStart, contentStart);
}

function extractPng(iconHtml) {
  const match = iconHtml.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/);
  return match ? Buffer.from(match[1], "base64") : null;
}

fs.mkdirSync("public/icons/ecosystem", { recursive: true });

for (const block of blocks) {
  const iconHtml = getIconBoxHtml(block.id);
  const png = extractPng(iconHtml);
  if (!png) {
    console.log("FAILED", block.label);
    continue;
  }
  fs.writeFileSync(`public/icons/ecosystem/${block.file}`, png);
  console.log(`Wrote ${block.file} (${png.length} bytes) - ${block.label}`);
}

// Ensure tools uses the paper airplane asset from the first feature slot if tools block still wrong
const toolsPath = "public/icons/ecosystem/4.png";
const slot1Path = "public/icons/ecosystem/1.png";

const toolsBuf = fs.readFileSync(toolsPath);
const slot1Buf = fs.readFileSync(slot1Path);

// If tools and slot1 accidentally share crown/heart, swap airplane into tools from reference first widget fallback
const airplaneFromFirst = extractPng(getIconBoxHtml("d1865ca"));
const heartFromToolsBlock = extractPng(getIconBoxHtml("7d0050e"));

if (airplaneFromFirst && heartFromToolsBlock) {
  // Reference currently serves airplane in first slot and heart in tools slot in some builds.
  // Force canonical mapping used on live design screenshot.
  fs.writeFileSync("public/icons/ecosystem/1.png", heartFromToolsBlock);
  fs.writeFileSync("public/icons/ecosystem/4.png", airplaneFromFirst);
  console.log("Remapped heart -> 1.png and airplane -> 4.png");
}

console.log("Done");
