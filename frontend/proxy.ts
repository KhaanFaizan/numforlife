import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { VISITOR_COOKIE, VISITOR_COOKIE_MAX_AGE } from "@/lib/visitor";
import { resolveLegacyRedirectAsync } from "@/lib/redirects/manifest-cache";

/** Paths that legitimately keep a trailing slash or must not be touched. */
const PRESERVE_TRAILING_SLASH = /^\/\.well-known(?:\/|$)/;

/** A path segment containing a dot is a file request, not a page. */
const LOOKS_LIKE_FILE = /\/[^/]+\.[^/]+$/;

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const legacyDestination = await resolveLegacyRedirectAsync(
    pathname,
    request.nextUrl.origin,
  );
  if (legacyDestination) {
    const target = new URL(legacyDestination, request.url);
    target.search = search;
    return NextResponse.redirect(target, 308);
  }

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
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|redirects.manifest.json|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|json|woff2?)$).*)",
  ],
};
