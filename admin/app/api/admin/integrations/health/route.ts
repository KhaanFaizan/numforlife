import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import { getIntegrationHealthReport } from "@/lib/integrations/health";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminPermission("ops:read");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  const report = await getIntegrationHealthReport();
  return NextResponse.json(report);
}
