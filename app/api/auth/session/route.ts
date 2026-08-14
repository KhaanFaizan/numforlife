import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/auth/audit-log";
import { AuthError } from "@/lib/auth/errors";
import { getAdminSession, loginAdmin, logoutAdmin } from "@/lib/auth/service";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();

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
    const user = await loginAdmin(request, { identifier, password });

    writeAuditLog({
      session: user,
      action: "auth.login",
      module: "auth",
      target: user.email,
      request,
    });

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

export async function DELETE(request: Request) {
  const session = await getAdminSession();

  await logoutAdmin();

  if (session) {
    writeAuditLog({
      session,
      action: "auth.logout",
      module: "auth",
      target: session.email,
      request,
    });
  }

  return NextResponse.json({ ok: true });
}
