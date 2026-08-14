import "server-only";

import { getDb } from "@/lib/cms/db";
import { getAppDbPool } from "@/lib/db/app-readonly";
import { isPlenorHubConfigured } from "@/lib/plenorhub/client";
import { readRedirectManifestFromDisk } from "@/lib/redirects/sync-manifest";
import type { IntegrationCheck, IntegrationHealthReport } from "./types";

const NUMEROLOGY_UPSTREAM =
  process.env.NUMEROLOGY_UPSTREAM_URL ?? "https://numforlife.com/member-number-simulate/";

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error("Timed out")), timeoutMs);
    }),
  ]);
}

function checkEnv(name: string, configured: boolean, detail?: string): IntegrationCheck {
  return {
    id: `env_${name}`,
    name: name,
    status: configured ? "ok" : "unconfigured",
    message: configured ? "Configured" : "Missing from environment",
    detail,
  };
}

async function checkCmsDatabase(): Promise<IntegrationCheck> {
  try {
    const row = getDb()
      .prepare("SELECT COUNT(*) AS count FROM cms_pages")
      .get() as { count: number };

    return {
      id: "cms_sqlite",
      name: "CMS database (SQLite)",
      status: "ok",
      message: "Connected",
      detail: `${row.count} page(s) seeded`,
    };
  } catch (error) {
    return {
      id: "cms_sqlite",
      name: "CMS database (SQLite)",
      status: "error",
      message: "Connection failed",
      detail: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function checkAppDatabase(): Promise<IntegrationCheck> {
  const pool = getAppDbPool();
  if (!pool) {
    return {
      id: "app_mysql",
      name: "App database (read-only MySQL)",
      status: "unconfigured",
      message: "DB_HOST / DB_USER / DB_PASS not set",
    };
  }

  try {
    const [rows] = await pool.query("SELECT COUNT(*) AS count FROM yzn_vip_levels");
    const count = Number((rows as Array<{ count: number }>)[0]?.count ?? 0);

    return {
      id: "app_mysql",
      name: "App database (read-only MySQL)",
      status: "ok",
      message: "Connected",
      detail: `${count} VIP level row(s) readable`,
    };
  } catch (error) {
    return {
      id: "app_mysql",
      name: "App database (read-only MySQL)",
      status: "error",
      message: "Query failed",
      detail: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function checkPlenorHub(): Promise<IntegrationCheck> {
  if (!isPlenorHubConfigured()) {
    return {
      id: "plenorhub",
      name: "PlenorHub commerce API",
      status: "unconfigured",
      message: "PLENORHUB_CHANNEL_KEY not set",
    };
  }

  try {
    const baseUrl = process.env.PLENORHUB_BASE_URL ?? "https://api.plenorhub.com/api/v1";
    const response = await withTimeout(
      fetch(`${baseUrl}/integration/products?per_page=1`, {
        headers: {
          Authorization: `Bearer ${process.env.PLENORHUB_CHANNEL_KEY}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }),
      10_000,
    );

    if (!response.ok) {
      return {
        id: "plenorhub",
        name: "PlenorHub commerce API",
        status: "error",
        message: `HTTP ${response.status}`,
      };
    }

    const payload = (await response.json()) as { data?: unknown[] };
    const count = Array.isArray(payload.data) ? payload.data.length : 0;

    return {
      id: "plenorhub",
      name: "PlenorHub commerce API",
      status: "ok",
      message: "API reachable",
      detail: count > 0 ? "Product feed returned data" : "Product feed empty",
    };
  } catch (error) {
    return {
      id: "plenorhub",
      name: "PlenorHub commerce API",
      status: "error",
      message: "Request failed",
      detail: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function checkNumerologyUpstream(): Promise<IntegrationCheck> {
  try {
    const response = await withTimeout(
      fetch(NUMEROLOGY_UPSTREAM, { method: "GET", cache: "no-store" }),
      10_000,
    );

    return {
      id: "numerology_upstream",
      name: "Numerology upstream (WordPress)",
      status: response.ok ? "ok" : "degraded",
      message: response.ok ? "Upstream reachable" : `HTTP ${response.status}`,
      detail: NUMEROLOGY_UPSTREAM,
    };
  } catch (error) {
    return {
      id: "numerology_upstream",
      name: "Numerology upstream (WordPress)",
      status: "error",
      message: "Upstream unreachable",
      detail: error instanceof Error ? error.message : NUMEROLOGY_UPSTREAM,
    };
  }
}

function checkRedirectManifest(): IntegrationCheck {
  const manifest = readRedirectManifestFromDisk();

  if (!manifest) {
    return {
      id: "redirect_manifest",
      name: "Redirect manifest",
      status: "degraded",
      message: "Manifest file missing — using built-in fallback",
    };
  }

  const exactCount = Object.keys(manifest.exact).length;
  const prefixCount = manifest.prefix.length;

  return {
    id: "redirect_manifest",
    name: "Redirect manifest",
    status: "ok",
    message: "Manifest synced",
    detail: `${exactCount} exact + ${prefixCount} prefix rule(s) · ${manifest.updatedAt}`,
  };
}

/** Aggregate integration health for the admin dashboard. */
export async function getIntegrationHealthReport(): Promise<IntegrationHealthReport> {
  const checks = await Promise.all([
    checkCmsDatabase(),
    checkAppDatabase(),
    checkPlenorHub(),
    checkNumerologyUpstream(),
    Promise.resolve(checkRedirectManifest()),
    Promise.resolve(checkEnv("SITE_URL", Boolean(process.env.SITE_URL))),
    Promise.resolve(checkEnv("SESSION_SECRET", Boolean(process.env.SESSION_SECRET))),
    Promise.resolve(checkEnv("KCC_CLIENT_ID", Boolean(process.env.KCC_CLIENT_ID))),
    Promise.resolve(
      checkEnv(
        "PUBLIC_HOST / ADMIN_HOST",
        Boolean(process.env.PUBLIC_HOST && process.env.ADMIN_HOST),
        "Required for UAT host split routing",
      ),
    ),
  ]);

  const ok = checks.every((check) => check.status === "ok" || check.status === "unconfigured");

  return {
    ok,
    checkedAt: new Date().toISOString(),
    checks,
  };
}
