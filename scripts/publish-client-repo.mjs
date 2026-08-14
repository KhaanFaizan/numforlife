# Publish frontend or admin to kccdigital client repos.
#
# Usage (from repo root, after both apps build):
#   node scripts/publish-client-repo.mjs frontend
#   node scripts/publish-client-repo.mjs admin
#
# Requires git remotes:
#   git remote add kcc-frontend https://github.com/kccdigital/shuyifn-web-frontend.git
#   git remote add kcc-admin https://github.com/kccdigital/shuyifn-web-admin.git

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const target = process.argv[2];
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const configs = {
  frontend: {
    remote: "kcc-frontend",
    branch: "main",
    appDir: "frontend",
    includeFrontendPreviewDeps: false,
  },
  admin: {
    remote: "kcc-admin",
    branch: "main",
    appDir: "admin",
    includeFrontendPreviewDeps: true,
  },
};

const cfg = configs[target];
if (!cfg) {
  console.error("Usage: node scripts/publish-client-repo.mjs <frontend|admin>");
  process.exit(1);
}

const staging = path.join(root, ".publish-staging", target);
rmSync(staging, { recursive: true, force: true });
mkdirSync(staging, { recursive: true });

const copy = (from, to = from) => {
  const src = path.join(root, from);
  const dest = path.join(staging, to);
  if (!existsSync(src)) return;
  mkdirSync(path.dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: true });
};

copy("packages/shared", "packages/shared");
copy(cfg.appDir, ".");
copy("deploy/uat/ecosystem.config.cjs", "deploy/ecosystem.config.cjs");
copy("deploy/uat/nginx-uat.conf.example", "deploy/nginx-uat.conf.example");
copy(".env.example");
copy("README.md");

if (cfg.includeFrontendPreviewDeps) {
  copy("frontend/components/home", "frontend/components/home");
  copy("frontend/components/sections", "frontend/components/sections");
}

writeFileSync(
  path.join(staging, "package.json"),
  JSON.stringify(
    {
      name: target === "frontend" ? "shuyifn-web-frontend" : "shuyifn-web-admin",
      private: true,
      workspaces: ["packages/shared"],
      scripts: {
        dev: "npm run dev --prefix .",
        build: "npm run build --prefix .",
        start: "npm run start --prefix .",
      },
    },
    null,
    2,
  ),
);

console.log(`Staged ${target} publish bundle at ${staging}`);
console.log("Review, then push manually or extend this script with git subtree logic.");
