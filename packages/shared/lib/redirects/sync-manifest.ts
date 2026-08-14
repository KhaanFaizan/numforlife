import "server-only";

import fs from "node:fs";
import path from "node:path";

import type { RedirectManifest, RedirectRule } from "./types";

const MANIFEST_PATH = path.join(process.cwd(), "public", "redirects.manifest.json");

export function writeRedirectManifest(manifest: RedirectManifest) {
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

export function readRedirectManifestFromDisk(): RedirectManifest | null {
  if (!fs.existsSync(MANIFEST_PATH)) return null;

  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")) as RedirectManifest;
  } catch {
    return null;
  }
}

export function rulesToManifest(rules: RedirectRule[]): RedirectManifest {
  const exact: Record<string, string> = {};
  const prefix: RedirectManifest["prefix"] = [];

  for (const rule of rules) {
    if (!rule.enabled) continue;

    if (rule.matchType === "prefix") {
      prefix.push({ prefix: rule.sourcePath, destination: rule.destinationPath });
    } else {
      exact[rule.sourcePath] = rule.destinationPath;
    }
  }

  prefix.sort((a, b) => b.prefix.length - a.prefix.length);

  return {
    exact,
    prefix,
    updatedAt: new Date().toISOString(),
  };
}
