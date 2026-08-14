import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/auth/audit-log";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import { resetDraftContent } from "@/lib/cms/repository";

export const runtime = "nodejs";

/** Load seeded defaults into a new draft (publish separately). */
export async function POST(request: Request) {
  let session;

  try {
    session = await requireAdminPermission("cms:reset");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  const draft = resetDraftContent();

  writeAuditLog({
    session,
    action: "cms.reset",
    module: "cms",
    target: "homepage",
    after: { draftVersion: true },
    request,
  });

  return NextResponse.json({ ok: true, draft });
}
