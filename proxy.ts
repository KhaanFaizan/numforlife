import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { VISITOR_COOKIE, VISITOR_COOKIE_MAX_AGE } from "@/lib/visitor";

/**
 * Edge proxy (Next 16 renamed `middleware` to `proxy`).
 *
 * Currently it does one job: guarantee every visitor carries a stable, anonymous
 * id. Pages cannot set cookies during render, so the id has to be assigned here.
 *
 * The id is a random opaque value — it identifies a browser for quota purposes
 * and nothing else. No personal data, and httpOnly so page scripts cannot read
 * or forge it.
 *
 * This is also where host-based routing for `uat-admin.numforlife.com` will live
 * when the admin host is split out.
 */
export function proxy(request: NextRequest) {
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico)$).*)"],
};
