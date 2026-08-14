import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    const target = new URL("/admin/login", request.url);
    return NextResponse.redirect(target, 308);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
