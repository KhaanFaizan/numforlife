import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import { listHomepageVersions } from "@/lib/cms/repository";

export const runtime = "nodejs";

/** List homepage content versions for history and rollback. */
export async function GET() {
  try {
    await requireAdminPermission("cms:read");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  return NextResponse.json({ versions: listHomepageVersions() });
}
