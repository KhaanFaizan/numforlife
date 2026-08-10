/**
 * Theme resolution.
 *
 * The chosen theme is stored in a plain (non-httpOnly) cookie so that BOTH the
 * server and the client can read it:
 *   - the server reads it in the root layout and stamps `data-theme` on <html>,
 *     so the correct palette is in the very first byte of HTML and there is no
 *     flash of the wrong theme on load;
 *   - the client reads/writes it in the toggle for an instant response with no
 *     server round-trip.
 *
 * It is a display preference, not a secret, so a readable cookie is correct here.
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
