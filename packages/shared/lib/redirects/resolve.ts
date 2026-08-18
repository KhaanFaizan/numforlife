import type { RedirectManifest } from "./types";
import { normaliseRedirectPath } from "./paths";

/**
 * Demo/original marketing URLs. Never 308 these away — even if an old CMS
 * row or a cached redirect still points somewhere else.
 */
export const PUBLIC_PAGES_WITHOUT_REDIRECT = [
  "/number",
  "/name",
  "/tarot",
  "/eastern-divination",
  "/shopping",
  "/sign-up",
] as const;

export function resolveRedirect(
  pathname: string,
  manifest: RedirectManifest,
): string | null {
  const normalized = normaliseRedirectPath(pathname);

  if (
    PUBLIC_PAGES_WITHOUT_REDIRECT.includes(
      normalized as (typeof PUBLIC_PAGES_WITHOUT_REDIRECT)[number],
    )
  ) {
    return null;
  }

  const exact = manifest.exact[normalized];

  if (exact && exact !== normalized) return exact;

  for (const { prefix, destination } of manifest.prefix) {
    if (normalized === prefix || normalized.startsWith(`${prefix}/`)) {
      return destination;
    }
  }

  return null;
}

export { normaliseRedirectPath as normalisePath } from "./paths";
