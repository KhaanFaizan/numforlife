import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/auth/audit-log";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import { deleteMediaAsset } from "@/lib/media/repository";

export const runtime = "nodejs";

type RouteProps = {
  params: Promise<{ id: string }>;
};

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
    const deleted = deleteMediaAsset(id);

    writeAuditLog({
      session,
      action: "media.delete",
      module: "media",
      target: deleted.url,
      before: deleted,
      request,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "MEDIA_NOT_FOUND") {
      return NextResponse.json({ error: "Media asset not found." }, { status: 404 });
    }
    throw error;
  }
}
