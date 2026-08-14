import "server-only";

import { randomUUID } from "node:crypto";

import { getDb } from "@/lib/cms/db";
import type { AdminSession } from "./types";

export type AuditLogInput = {
  session: Pick<AdminSession, "kccUserId" | "email" | "role">;
  action: string;
  module: string;
  target?: string | null;
  before?: unknown;
  after?: unknown;
  reason?: string | null;
  request?: Request;
};

function serializeSnapshot(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  try {
    return JSON.stringify(value);
  } catch {
    return JSON.stringify({ error: "UNSERIALIZABLE" });
  }
}

function requestMeta(request?: Request) {
  if (!request) {
    return { ip: null, userAgent: null };
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip");
  const userAgent = request.headers.get("user-agent");

  return {
    ip: ip ?? null,
    userAgent: userAgent ?? null,
  };
}

/** Append-only admin audit trail. */
export function writeAuditLog(input: AuditLogInput) {
  const { ip, userAgent } = requestMeta(input.request);
  const createdAt = new Date().toISOString();

  getDb()
    .prepare(
      `INSERT INTO audit_logs
        (id, admin_kcc_user_id, admin_email, admin_role, action, module, target,
         before_json, after_json, reason, ip, user_agent, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      randomUUID(),
      input.session.kccUserId,
      input.session.email,
      input.session.role,
      input.action,
      input.module,
      input.target ?? null,
      serializeSnapshot(input.before),
      serializeSnapshot(input.after),
      input.reason ?? null,
      ip,
      userAgent,
      createdAt,
    );
}

export type AuditLogSummary = {
  id: string;
  adminEmail: string;
  adminRole: string;
  action: string;
  module: string;
  target: string | null;
  createdAt: string;
};

export function listRecentAuditLogs(limit = 50): AuditLogSummary[] {
  const rows = getDb()
    .prepare(
      `SELECT id, admin_email, admin_role, action, module, target, created_at
         FROM audit_logs
        ORDER BY created_at DESC
        LIMIT ?`,
    )
    .all(limit) as Array<{
    id: string;
    admin_email: string;
    admin_role: string;
    action: string;
    module: string;
    target: string | null;
    created_at: string;
  }>;

  return rows.map((row) => ({
    id: row.id,
    adminEmail: row.admin_email,
    adminRole: row.admin_role,
    action: row.action,
    module: row.module,
    target: row.target,
    createdAt: row.created_at,
  }));
}
