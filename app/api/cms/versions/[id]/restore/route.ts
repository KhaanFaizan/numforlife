import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/auth/audit-log";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import { restoreVersionAsDraft } from "@/lib/cms/repository";

export const runtime = "nodejs";

type RouteProps = {
  params: Promise<{ id: string }>;
};

/** Restore a historical version into the current draft. */
export async function POST(request: Request, { params }: RouteProps) {
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
    const result = restoreVersionAsDraft(id);

    writeAuditLog({
      session,
      action: "cms.restore",
      module: "cms",
      target: `homepage/version/${id}`,
      after: result,
      request,
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    if (error instanceof Error && error.message === "VERSION_NOT_FOUND") {
      return NextResponse.json({ error: "Version not found." }, { status: 404 });
    }
    throw error;
  }
}
