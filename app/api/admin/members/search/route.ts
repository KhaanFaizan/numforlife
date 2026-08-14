import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import { searchMembers } from "@/lib/member/support-repository";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await requireAdminPermission("support:read");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const results = await searchMembers(query);
  return NextResponse.json({ results });
}
