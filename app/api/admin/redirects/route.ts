import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/auth/audit-log";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import {
  createRedirectRule,
  ensureRedirectManifestReady,
  listRedirectRules,
} from "@/lib/redirects/repository";
import type { RedirectMatchType } from "@/lib/redirects/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireAdminPermission("cms:read");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  ensureRedirectManifestReady();

  return NextResponse.json({
    rules: listRedirectRules({ includeDisabled: true }),
    manifestUpdatedAt: ensureRedirectManifestReady().updatedAt,
  });
}

export async function POST(request: Request) {
  let session;

  try {
    session = await requireAdminPermission("cms:write");
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

  const payload = body as {
    sourcePath?: unknown;
    destinationPath?: unknown;
    matchType?: unknown;
    enabled?: unknown;
    note?: unknown;
  };

  const sourcePath =
    typeof payload.sourcePath === "string" ? payload.sourcePath : "";
  const destinationPath =
    typeof payload.destinationPath === "string" ? payload.destinationPath : "";
  const matchType =
    payload.matchType === "prefix" || payload.matchType === "exact"
      ? (payload.matchType as RedirectMatchType)
      : null;

  if (!sourcePath || !destinationPath || !matchType) {
    return NextResponse.json(
      { error: "sourcePath, destinationPath, and matchType are required." },
      { status: 400 },
    );
  }

  try {
    const rule = createRedirectRule({
      sourcePath,
      destinationPath,
      matchType,
      enabled: payload.enabled === false ? false : true,
      note: typeof payload.note === "string" ? payload.note : null,
    });

    writeAuditLog({
      session,
      action: "redirects.create",
      module: "redirects",
      target: rule.sourcePath,
      after: rule,
      request,
    });

    return NextResponse.json({ ok: true, rule });
  } catch (error) {
    if (error instanceof Error && error.message.includes("UNIQUE constraint failed")) {
      return NextResponse.json(
        { error: "A redirect with this source path already exists." },
        { status: 409 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    throw error;
  }
}
