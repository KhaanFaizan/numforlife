import { BUILTIN_REDIRECT_MANIFEST } from "./builtin";
import { resolveRedirect, normalisePath } from "./resolve";
import type { RedirectManifest } from "./types";

let cachedManifest: RedirectManifest | null = null;
let cachedAt = 0;

const TTL_MS = 15_000;

/**
 * Load redirect rules for the edge proxy.
 *
 * 1. Static `/redirects.manifest.json` (admin publish copies via
 *    REDIRECTS_MANIFEST_PUBLIC_COPY) — safe fetch because that path is excluded
 *    from the proxy matcher, so no self-fetch deadlock.
 * 2. Built-in WordPress map fallback.
 */
export async function getRedirectManifest(origin: string): Promise<RedirectManifest> {
  if (cachedManifest && Date.now() - cachedAt < TTL_MS) {
    return cachedManifest;
  }

  try {
    const response = await fetch(`${origin}/redirects.manifest.json`, {
      cache: "no-store",
      signal: AbortSignal.timeout(3_000),
    });

    if (response.ok) {
      cachedManifest = (await response.json()) as RedirectManifest;
      cachedAt = Date.now();
      return cachedManifest;
    }
  } catch {
    // Fall through to built-in map.
  }

  cachedManifest = BUILTIN_REDIRECT_MANIFEST;
  cachedAt = Date.now();
  return cachedManifest;
}

export async function resolveLegacyRedirectAsync(
  pathname: string,
  origin: string,
): Promise<string | null> {
  const manifest = await getRedirectManifest(origin);
  return resolveRedirect(pathname, manifest);
}

export { normalisePath, resolveRedirect };
