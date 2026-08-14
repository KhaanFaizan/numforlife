import { BUILTIN_REDIRECT_MANIFEST } from "./builtin";
import { resolveRedirect, normalisePath } from "./resolve";
import type { RedirectManifest } from "./types";

let cachedManifest: RedirectManifest | null = null;
let cachedAt = 0;

const TTL_MS = 15_000;

export async function getRedirectManifest(origin: string): Promise<RedirectManifest> {
  if (cachedManifest && Date.now() - cachedAt < TTL_MS) {
    return cachedManifest;
  }

  try {
    const response = await fetch(`${origin}/redirects.manifest.json`, {
      cache: "no-store",
    });

    if (response.ok) {
      cachedManifest = (await response.json()) as RedirectManifest;
      cachedAt = Date.now();
      return cachedManifest;
    }
  } catch {
    // Fall back to built-in map below.
  }

  return BUILTIN_REDIRECT_MANIFEST;
}

export async function resolveLegacyRedirectAsync(
  pathname: string,
  origin: string,
): Promise<string | null> {
  const manifest = await getRedirectManifest(origin);
  return resolveRedirect(pathname, manifest);
}

export { normalisePath, resolveRedirect };
