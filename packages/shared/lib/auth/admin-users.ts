import "server-only";

import { randomUUID } from "node:crypto";
import { getDb } from "@/lib/cms/db";
import type { AdminRole, AdminUserRecord } from "./types";

type AdminUserRow = {
  id: string;
  kcc_user_id: string;
  email: string;
  role: AdminRole;
  status: "active" | "suspended";
  created_at: string;
  updated_at: string;
};

function mapRow(row: AdminUserRow): AdminUserRecord {
  return {
    id: row.id,
    kccUserId: row.kcc_user_id,
    email: row.email,
    role: row.role,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function nowIso() {
  return new Date().toISOString();
}

/** Seed a bootstrap admin when env vars are supplied (UAT/local setup). */
export function ensureAdminUsersSeeded() {
  const bootstrapKccUserId = process.env.ADMIN_BOOTSTRAP_KCC_USER_ID?.trim();
  if (!bootstrapKccUserId) return;

  const database = getDb();
  const existing = database
    .prepare("SELECT id FROM admin_users WHERE kcc_user_id = ?")
    .get(bootstrapKccUserId) as { id: string } | undefined;

  if (existing) return;

  const createdAt = nowIso();
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim() || "admin@example.com";
  const role = (process.env.ADMIN_BOOTSTRAP_ROLE?.trim() ||
    "super_admin") as AdminRole;

  database
    .prepare(
      `INSERT INTO admin_users
        (id, kcc_user_id, email, role, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'active', ?, ?)`,
    )
    .run(randomUUID(), bootstrapKccUserId, email, role, createdAt, createdAt);
}

export function getAdminUserByKccId(kccUserId: string): AdminUserRecord | null {
  ensureAdminUsersSeeded();

  const row = getDb()
    .prepare(
      `SELECT id, kcc_user_id, email, role, status, created_at, updated_at
       FROM admin_users
       WHERE kcc_user_id = ?`,
    )
    .get(kccUserId) as AdminUserRow | undefined;

  return row ? mapRow(row) : null;
}

export function upsertAdminUserEmail(kccUserId: string, email: string) {
  const database = getDb();
  const existing = getAdminUserByKccId(kccUserId);
  if (!existing) return;

  const updatedAt = nowIso();
  database
    .prepare("UPDATE admin_users SET email = ?, updated_at = ? WHERE kcc_user_id = ?")
    .run(email, updatedAt, kccUserId);
}

export function requireActiveAdminUser(kccUserId: string): AdminUserRecord {
  const admin = getAdminUserByKccId(kccUserId);

  if (!admin) {
    throw new Error("ADMIN_NOT_REGISTERED");
  }

  if (admin.status !== "active") {
    throw new Error("ADMIN_SUSPENDED");
  }

  return admin;
}
