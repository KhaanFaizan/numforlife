/**
 * WordPress → Next.js URL map.
 *
 * Redirect rules are stored in SQLite and synced to `public/redirects.manifest.json`
 * for the edge proxy. The built-in map in `lib/redirects/builtin.ts` is the fallback.
 */

import { BUILTIN_REDIRECT_MANIFEST } from "@/lib/redirects/builtin";
import { normalisePath, resolveRedirect } from "@/lib/redirects/resolve";

export { normalisePath };

/** Synchronous resolver using the built-in map — for tests and tooling. */
export function resolveLegacyRedirect(pathname: string): string | null {
  return resolveRedirect(pathname, BUILTIN_REDIRECT_MANIFEST);
}

/** @deprecated Import from lib/redirects/builtin instead. */
export const LEGACY_REDIRECTS = BUILTIN_REDIRECT_MANIFEST.exact;
