import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/auth/audit-log";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import {
  deleteRedirectRule,
  getRedirectRule,
  updateRedirectRule,
} from "@/lib/redirects/repository";
import type { RedirectMatchType } from "@/lib/redirects/types";

export const runtime = "nodejs";

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, { params }: RouteProps) {
  let session;

  try {
    session = await requireAdminPermission("cms:write");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  const { id } = await params;
  const before = getRedirectRule(id);

  if (!before) {
    return NextResponse.json({ error: "Redirect not found." }, { status: 404 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const payload = body as {
    sourcePath?: unknown;
    destinationPath?: unknown;
    matchType?: unknown;
    enabled?: unknown;
    note?: unknown;
  };

  try {
    const rule = updateRedirectRule(id, {
      sourcePath:
        typeof payload.sourcePath === "string" ? payload.sourcePath : undefined,
      destinationPath:
        typeof payload.destinationPath === "string"
          ? payload.destinationPath
          : undefined,
      matchType:
        payload.matchType === "prefix" || payload.matchType === "exact"
          ? (payload.matchType as RedirectMatchType)
          : undefined,
      enabled: typeof payload.enabled === "boolean" ? payload.enabled : undefined,
      note: typeof payload.note === "string" ? payload.note : undefined,
    });

    writeAuditLog({
      session,
      action: "redirects.update",
      module: "redirects",
      target: rule.sourcePath,
      before,
      after: rule,
      request,
    });

    return NextResponse.json({ ok: true, rule });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }
}

export async function DELETE(request: Request, { params }: RouteProps) {
  let session;

  try {
    session = await requireAdminPermission("cms:write");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  const { id } = await params;
  const before = getRedirectRule(id);

  if (!before) {
    return NextResponse.json({ error: "Redirect not found." }, { status: 404 });
  }

  deleteRedirectRule(id);

  writeAuditLog({
    session,
    action: "redirects.delete",
    module: "redirects",
    target: before.sourcePath,
    before,
    request,
  });

  return NextResponse.json({ ok: true });
}
