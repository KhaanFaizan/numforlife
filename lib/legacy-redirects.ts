/**
 * WordPress → Next.js URL map.
 *
 * Every key is a URL currently in numforlife.com's sitemap, so search equity and
 * existing inbound links survive the migration (PRD 15).
 *
 * Handled in `proxy.ts` rather than `next.config.ts` redirects for one reason:
 * WordPress serves every URL WITH a trailing slash, and Next's automatic
 * trailing-slash normalisation runs before config redirects. That turns the
 * common case into a two-hop chain (`/number/` → `/number` → `/celue/number`).
 * The proxy runs first, so matching both forms here collapses it to one hop.
 *
 * Only routes this build can serve are listed. Redirecting a live URL to a page
 * that does not exist yet would turn a working page into a 404, which is worse
 * than leaving it alone.
 *
 * No trailing slashes in the keys — `normalisePath` strips them before lookup.
 */
export const LEGACY_REDIRECTS: Record<string, string> = {
  // The working calculator: the highest-traffic URL being migrated.
  "/member-number-simulate": "/celue/number",

  // Service landing pages. 数字生命 has a calculator; the others resolve to the
  // 测算 listing, where they appear as coming-soon cards.
  "/number": "/celue/number",
  "/name": "/celue",
  "/tarot": "/celue",
  "/eastern-divination": "/celue",
};

/**
 * Still to be mapped once their destinations exist:
 *   /membership                      → membership page
 *   /my-account, /sign-up            → auth + user dashboard
 *   /cart, /checkout, /view-order    → PlenorHub shop
 *   /product/*, /product-category/*  → shop
 *   /privacy-policy, /refund-policy, /shipping-policy,
 *   /accessibility-statement, /使用条款 (percent-encoded) → legal pages
 */

/** Lower-cases and strips a trailing slash so both URL forms hit one entry. */
export function normalisePath(pathname: string): string {
  const lower = pathname.toLowerCase();
  return lower.length > 1 && lower.endsWith("/") ? lower.slice(0, -1) : lower;
}

/** The destination for a legacy path, or null if it is not a legacy URL. */
export function resolveLegacyRedirect(pathname: string): string | null {
  return LEGACY_REDIRECTS[normalisePath(pathname)] ?? null;
}
