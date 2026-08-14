import "server-only";

import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";
import { AuthConfigError } from "./errors";
import { jwtExpiresAtMs, jwtTokenVersion } from "./jwt";
import type { AdminRole } from "./types";

export const ADMIN_SESSION_COOKIE = "nfl_admin_session";

/** Seven days — refresh tokens rotate server-side when used. */
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export type StoredAdminSession = {
  kccUserId: string;
  email: string;
  name: string | null;
  role: AdminRole;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  tokenVersion: number | null;
};

function sessionKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new AuthConfigError(
      "SESSION_SECRET must be set to at least 32 characters for admin authentication.",
    );
  }

  return createHash("sha256").update(secret).digest();
}

export function encryptSession(session: StoredAdminSession): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", sessionKey(), iv);
  const plaintext = Buffer.from(JSON.stringify(session), "utf8");
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

export function decryptSession(value: string): StoredAdminSession | null {
  try {
    const buffer = Buffer.from(value, "base64url");
    const iv = buffer.subarray(0, 12);
    const tag = buffer.subarray(12, 28);
    const encrypted = buffer.subarray(28);

    const decipher = createDecipheriv("aes-256-gcm", sessionKey(), iv);
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    return JSON.parse(plaintext.toString("utf8")) as StoredAdminSession;
  } catch {
    return null;
  }
}

export function buildStoredSession(input: {
  kccUserId: string;
  email: string;
  name: string | null;
  role: AdminRole;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}): StoredAdminSession {
  const expiresAt =
    jwtExpiresAtMs(input.accessToken) ?? Date.now() + input.expiresIn * 1000;

  return {
    kccUserId: input.kccUserId,
    email: input.email,
    name: input.name,
    role: input.role,
    accessToken: input.accessToken,
    refreshToken: input.refreshToken,
    expiresAt,
    tokenVersion: jwtTokenVersion(input.accessToken),
  };
}

export function sessionNeedsRefresh(session: StoredAdminSession, now = Date.now()) {
  return session.expiresAt - now < 5 * 60 * 1000;
}

export function toPublicSession(
  session: StoredAdminSession,
): Pick<StoredAdminSession, "kccUserId" | "email" | "name" | "role"> {
  return {
    kccUserId: session.kccUserId,
    email: session.email,
    name: session.name,
    role: session.role,
  };
}
