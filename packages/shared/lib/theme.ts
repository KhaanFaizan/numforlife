/**
 * Theme resolution for the public site.
 *
 * Demo / original WordPress use a two-state darkmode.js invert (class
 * `darkmode--activated`), not a separate light palette. The cookie still
 * stores the choice so the server can stamp that class on first paint.
 *
 * Admin keeps its own `data-theme` handling.
 */

export const THEME_COOKIE = "shuyi-theme";

/** What the user picked. "system" means: follow the OS setting. */
export type ThemePreference = "light" | "dark" | "system";

/** What actually gets stamped on <html>. "system" stamps nothing. */
export type ResolvedTheme = "light" | "dark" | null;

export const THEME_PREFERENCES: ThemePreference[] = ["light", "dark", "system"];

export function isThemePreference(value: unknown): value is ThemePreference {
  return typeof value === "string" && (THEME_PREFERENCES as string[]).includes(value);
}

/**
 * Map a stored preference to the `data-theme` attribute value.
 *
 * Returning null for "system" (and for anything unrecognised) is deliberate:
 * with no attribute present, the `prefers-color-scheme` media query in
 * globals.css takes over, which is exactly what "system" should mean.
 */
export function resolveTheme(preference: string | undefined): ResolvedTheme {
  if (preference === "light" || preference === "dark") return preference;
  return null;
}

/** One year — a display preference should not expire during normal use. */
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
