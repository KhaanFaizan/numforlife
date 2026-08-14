/** Normalise redirect source paths for lookup (lowercase, no trailing slash). */
export function normaliseRedirectPath(pathname: string): string {
  const lower = pathname.toLowerCase();
  return lower.length > 1 && lower.endsWith("/") ? lower.slice(0, -1) : lower;
}

export function sanitiseRedirectPath(value: string, label: string): string {
  const trimmed = value.trim();

  if (!trimmed.startsWith("/")) {
    throw new Error(`${label} must start with /.`);
  }

  if (trimmed.includes("://")) {
    throw new Error(`${label} must be a site path, not a full URL.`);
  }

  const normalised = normaliseRedirectPath(trimmed);
  if (!normalised || normalised === "/") {
    throw new Error(`${label} cannot be the site root.`);
  }

  return normalised;
}
