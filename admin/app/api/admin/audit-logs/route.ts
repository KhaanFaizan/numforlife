import { NextResponse } from "next/server";
import { listRecentAuditLogs } from "@/lib/auth/audit-log";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";

export const runtime = "nodejs";

/** Recent admin audit events for the dashboard and audit page. */
export async function GET(request: Request) {
  try {
    await requireAdminPermission("cms:read");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  const limitParam = new URL(request.url).searchParams.get("limit");
  const limit = Math.min(Math.max(Number(limitParam) || 20, 1), 100);

  return NextResponse.json({ logs: listRecentAuditLogs(limit) });
}
