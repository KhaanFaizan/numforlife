import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import { discardDraftContent, saveDraftContent } from "@/lib/cms/repository";
import { isValidCMSContent } from "@/lib/cms/validate";

export const runtime = "nodejs";

/** Save homepage draft without publishing to the live site. */
export async function PUT(request: Request) {
  try {
    await requireAdminPermission("cms:write");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidCMSContent(body)) {
    return NextResponse.json({ error: "Invalid CMS content payload" }, { status: 400 });
  }

  const result = saveDraftContent(body);

  return NextResponse.json({ ok: true, ...result });
}

/** Discard the current draft and revert to published content. */
export async function DELETE() {
  try {
    await requireAdminPermission("cms:write");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  const published = discardDraftContent();
  return NextResponse.json({ ok: true, published });
}
