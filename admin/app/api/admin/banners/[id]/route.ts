import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/auth/audit-log";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import {
  deleteSiteBanner,
  getSiteBanner,
  updateSiteBanner,
} from "@/lib/banners/repository";
import type { SiteBannerInput } from "@/lib/banners/types";

export const runtime = "nodejs";

type RouteProps = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: RouteProps) {
  let session;

  try {
    session = await requireAdminPermission("cms:write");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  const { id } = await params;
  let body: SiteBannerInput;

  try {
    body = (await request.json()) as SiteBannerInput;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const before = getSiteBanner(id);
    const banner = updateSiteBanner(id, body);

    writeAuditLog({
      session,
      action: "banners.update",
      module: "banners",
      target: banner.id,
      before,
      after: banner,
      request,
    });

    return NextResponse.json({ ok: true, banner });
  } catch (error) {
    if (error instanceof Error && error.message === "BANNER_NOT_FOUND") {
      return NextResponse.json({ error: "Banner not found." }, { status: 404 });
    }
    throw error;
  }
}

export async function DELETE(request: Request, { params }: RouteProps) {
  let session;

  try {
    session = await requireAdminPermission("cms:write");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  const { id } = await params;

  try {
    const deleted = deleteSiteBanner(id);

    writeAuditLog({
      session,
      action: "banners.delete",
      module: "banners",
      target: deleted.id,
      before: deleted,
      request,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "BANNER_NOT_FOUND") {
      return NextResponse.json({ error: "Banner not found." }, { status: 404 });
    }
    throw error;
  }
}
