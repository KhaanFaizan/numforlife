import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import { getEditorState } from "@/lib/cms/repository";

export const runtime = "nodejs";

/** Return published baseline, working draft, and change flags for the editor. */
export async function GET() {
  try {
    await requireAdminPermission("cms:read");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  return NextResponse.json(getEditorState());
}
