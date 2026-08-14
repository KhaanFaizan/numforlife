import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/auth/audit-log";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import { publishDraftContent } from "@/lib/cms/repository";

export const runtime = "nodejs";

/** Publish the current draft to the live site. */
export async function POST(request: Request) {
  let session;

  try {
    session = await requireAdminPermission("cms:publish");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  try {
    const result = publishDraftContent();

    writeAuditLog({
      session,
      action: "cms.publish",
      module: "cms",
      target: "homepage",
      after: result,
      request,
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    if (error instanceof Error && error.message === "NO_DRAFT") {
      return NextResponse.json({ error: "No draft to publish." }, { status: 400 });
    }
    throw error;
  }
}
