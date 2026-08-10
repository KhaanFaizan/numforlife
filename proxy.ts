import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { VISITOR_COOKIE, VISITOR_COOKIE_MAX_AGE } from "@/lib/visitor";
import { resolveLegacyRedirect } from "@/lib/legacy-redirects";

/**
 * Edge proxy (Next 16 renamed `middleware` to `proxy`).
 *
 * Responsibilities, in order:
 *
 * 1. Redirect legacy WordPress URLs in a SINGLE hop.
 *    WordPress serves every URL with a trailing slash, and Next's built-in
 *    trailing-slash normalisation runs before both config redirects and this
 *    proxy. Left alone, every inbound link becomes a two-hop chain
 *    (`/number/` → `/number` → `/celue/number`), which wastes crawl budget on a
 *    migration whose whole point is preserving search equity. So the built-in
 *    behaviour is disabled via `skipTrailingSlashRedirect` and handled here.
 *
 * 2. Enforce the canonical no-trailing-slash form for everything else.
 *    This is not optional once normalisation is disabled — without it both
 *    `/about-us` and `/about-us/` would return 200 and duplicate every page.
 *
 * 3. Give every visitor a stable anonymous id, used for calculation quotas.
 *    Pages cannot set cookies during render, so it has to happen here. The value
 *    is opaque and httpOnly: it identifies a browser for quota purposes and
 *    nothing else.
 *
 * This is also where host-based routing for `uat-admin.numforlife.com` will live.
 */

/** Paths that legitimately keep a trailing slash or must not be touched. */
const PRESERVE_TRAILING_SLASH = /^\/\.well-known(?:\/|$)/;

/** A path segment containing a dot is a file request, not a page. */
const LOOKS_LIKE_FILE = /\/[^/]+\.[^/]+$/;

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Legacy WordPress URLs — matched with or without a trailing slash.
  const legacyDestination = resolveLegacyRedirect(pathname);
  if (legacyDestination) {
    const target = new URL(legacyDestination, request.url);
    // Campaign and UTM parameters must survive the move.
    target.search = search;
    return NextResponse.redirect(target, 308);
  }

  // 2. Canonicalise: strip a trailing slash from everything except the root.
  if (
    pathname.length > 1 &&
    pathname.endsWith("/") &&
    !PRESERVE_TRAILING_SLASH.test(pathname) &&
    !LOOKS_LIKE_FILE.test(pathname)
  ) {
    const target = new URL(pathname.slice(0, -1), request.url);
    target.search = search;
    return NextResponse.redirect(target, 308);
  }

  // 3. Anonymous visitor id for quota tracking.
  const response = NextResponse.next();

  if (!request.cookies.has(VISITOR_COOKIE)) {
    response.cookies.set(VISITOR_COOKIE, crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: VISITOR_COOKIE_MAX_AGE,
    });
  }

  return response;
}

export const config = {
  // Without a matcher this runs on every request including static assets, which
  // would issue cookies for stylesheets and images.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico)$).*)",
  ],
};
