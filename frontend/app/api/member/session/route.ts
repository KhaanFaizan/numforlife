import { NextResponse } from "next/server";
import { AuthError } from "@/lib/auth/errors";
import {
  getMemberSession,
  loginMember,
  logoutMember,
} from "@/lib/auth/member-service";

export const runtime = "nodejs";

export async function GET() {
  const session = await getMemberSession();

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, user: session });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const identifier =
    typeof (body as { identifier?: unknown }).identifier === "string"
      ? (body as { identifier: string }).identifier.trim()
      : "";
  const password =
    typeof (body as { password?: unknown }).password === "string"
      ? (body as { password: string }).password
      : "";

  if (!identifier || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  try {
    const user = await loginMember(request, { identifier, password });
    return NextResponse.json({ ok: true, user });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message, code: error.code }, { status: error.status });
    }

    if (error instanceof Error && error.message.includes("SESSION_SECRET")) {
      return NextResponse.json(
        { error: "Server authentication is not configured." },
        { status: 500 },
      );
    }

    return NextResponse.json({ error: "Unable to sign in." }, { status: 500 });
  }
}

export async function DELETE() {
  await logoutMember();
  return NextResponse.json({ ok: true });
}
