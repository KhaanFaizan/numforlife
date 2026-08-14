import { NextResponse } from "next/server";
import { listRecentAuditLogs } from "@/lib/auth/audit-log";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";

export const runtime = "nodejs";

/** Recent admin audit events for the dashboard. */
export async function GET() {
  try {
    await requireAdminPermission("cms:read");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  return NextResponse.json({ logs: listRecentAuditLogs(20) });
}
