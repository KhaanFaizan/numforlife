/**
 * Anonymous visitor identity constants.
 *
 * Deliberately free of any `server-only` guard so that `proxy.ts` — which runs in
 * the edge runtime and therefore cannot import server-only modules — can share
 * these with the server-side quota logic in `lib/rate-limit.ts`.
 *
 * Only the constants live here. The quota logic itself stays server-only.
 */

export const VISITOR_COOKIE = "nfl_vid";

/** One year: quotas reset daily, but the identity should persist. */
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
