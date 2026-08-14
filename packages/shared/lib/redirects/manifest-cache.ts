import { BUILTIN_REDIRECT_MANIFEST } from "./builtin";
import { resolveRedirect, normalisePath } from "./resolve";
import type { RedirectManifest } from "./types";

let cachedManifest: RedirectManifest | null = null;
let cachedAt = 0;

const TTL_MS = 15_000;

/**
 * Resolve the active redirect manifest for edge proxy use.
 *
 * Do NOT HTTP-fetch `/redirects.manifest.json` here — that request is handled
 * by the same proxy and deadlocks (each manifest lookup triggers another until
 * the fetch times out, ~70s+).
 *
 * Custom rules from the admin CMS are written to disk/nginx in production.
 * Until edge-safe manifest loading exists, the proxy uses the built-in map.
 */
export async function getRedirectManifest(): Promise<RedirectManifest> {
  if (cachedManifest && Date.now() - cachedAt < TTL_MS) {
    return cachedManifest;
  }

  cachedManifest = BUILTIN_REDIRECT_MANIFEST;
  cachedAt = Date.now();
  return cachedManifest;
}

export async function resolveLegacyRedirectAsync(
  pathname: string,
): Promise<string | null> {
  const manifest = await getRedirectManifest();
  return resolveRedirect(pathname, manifest);
}

export { normalisePath, resolveRedirect };
