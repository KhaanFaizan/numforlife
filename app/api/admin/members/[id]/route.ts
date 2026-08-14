import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/auth/audit-log";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import { getMemberDashboard } from "@/lib/member/repository";

export const runtime = "nodejs";

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: RouteProps) {
  let session;

  try {
    session = await requireAdminPermission("support:read");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  const { id } = await params;
  const memberId = Number(id);

  if (!Number.isFinite(memberId)) {
    return NextResponse.json({ error: "Invalid member id." }, { status: 400 });
  }

  const member = await getMemberDashboard(memberId);

  if (!member) {
    return NextResponse.json({ error: "Member not found." }, { status: 404 });
  }

  writeAuditLog({
    session,
    action: "support.view_member",
    module: "support",
    target: `member/${memberId}`,
    request,
  });

  return NextResponse.json({ member });
}
