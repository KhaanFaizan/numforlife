import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/auth/audit-log";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import type { SiteFlagKey } from "@/lib/settings/flags";
import { SITE_FLAG_DEFINITIONS } from "@/lib/settings/flags";
import { listSiteFlagDefinitions, updateSiteFlags } from "@/lib/settings/repository";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireAdminPermission("ops:read");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  return NextResponse.json({ flags: listSiteFlagDefinitions() });
}

export async function PUT(request: Request) {
  let session;

  try {
    session = await requireAdminPermission("ops:write");
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

  const payload = body as Record<string, unknown>;
  const updates: Partial<Record<SiteFlagKey, boolean>> = {};

  for (const definition of SITE_FLAG_DEFINITIONS) {
    const value = payload[definition.key];
    if (typeof value === "boolean") {
      updates[definition.key] = value;
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid flag updates supplied." }, { status: 400 });
  }

  const flags = updateSiteFlags(updates, session.email);

  writeAuditLog({
    session,
    action: "settings.update_flags",
    module: "settings",
    target: "site_flags",
    after: updates,
    request,
  });

  return NextResponse.json({ ok: true, flags: listSiteFlagDefinitions() });
}
