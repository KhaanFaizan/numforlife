import "server-only";

import fs from "node:fs";
import path from "node:path";

import {
  redirectsManifestPath,
  redirectsManifestPublicCopyPath,
} from "@/lib/deployment/paths";
import type { RedirectManifest, RedirectRule } from "./types";

export function writeRedirectManifest(manifest: RedirectManifest) {
  const targets = [redirectsManifestPath()];
  const publicCopy = redirectsManifestPublicCopyPath();
  if (publicCopy) targets.push(publicCopy);

  const payload = `${JSON.stringify(manifest, null, 2)}\n`;

  for (const target of targets) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, payload, "utf8");
  }
}

export function readRedirectManifestFromDisk(): RedirectManifest | null {
  const manifestPath = redirectsManifestPath();
  if (!fs.existsSync(manifestPath)) return null;

  try {
    return JSON.parse(fs.readFileSync(manifestPath, "utf8")) as RedirectManifest;
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
