import type { RedirectManifest } from "./types";
import { normaliseRedirectPath } from "./paths";

export function resolveRedirect(
  pathname: string,
  manifest: RedirectManifest,
): string | null {
  const normalized = normaliseRedirectPath(pathname);
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
