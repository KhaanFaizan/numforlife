import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/auth/audit-log";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import { createSiteBanner, listSiteBanners } from "@/lib/banners/repository";
import type { SiteBannerInput } from "@/lib/banners/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireAdminPermission("cms:read");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  return NextResponse.json({ banners: listSiteBanners() });
}

export async function POST(request: Request) {
  let session;

  try {
    session = await requireAdminPermission("cms:write");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  let body: SiteBannerInput;

  try {
    body = (await request.json()) as SiteBannerInput;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const banner = createSiteBanner(body);

    writeAuditLog({
      session,
      action: "banners.create",
      module: "banners",
      target: banner.id,
      after: banner,
      request,
    });

    return NextResponse.json({ ok: true, banner });
  } catch (error) {
    if (error instanceof Error && error.message === "BANNER_TITLE_AND_MESSAGE_REQUIRED") {
      return NextResponse.json({ error: "Title and message are required." }, { status: 400 });
    }
    throw error;
  }
}
