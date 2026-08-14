import "server-only";

import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";
import { AuthConfigError } from "./errors";

export const MEMBER_SESSION_COOKIE = "nfl_member_session";
export const MEMBER_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export type StoredMemberSession = {
  memberId: number;
  kccUserId: string;
  email: string | null;
  name: string | null;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  tokenVersion: number | null;
};

export type MemberSession = {
  memberId: number;
  kccUserId: string;
  email: string | null;
  name: string | null;
};

function sessionKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new AuthConfigError(
      "SESSION_SECRET must be set to at least 32 characters for member authentication.",
    );
  }

  return createHash("sha256").update(secret).digest();
}

export function encryptMemberSession(session: StoredMemberSession): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", sessionKey(), iv);
  const plaintext = Buffer.from(JSON.stringify(session), "utf8");
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

export function decryptMemberSession(value: string): StoredMemberSession | null {
  try {
    const buffer = Buffer.from(value, "base64url");
    const iv = buffer.subarray(0, 12);
    const tag = buffer.subarray(12, 28);
    const encrypted = buffer.subarray(28);

    const decipher = createDecipheriv("aes-256-gcm", sessionKey(), iv);
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    return JSON.parse(plaintext.toString("utf8")) as StoredMemberSession;
  } catch {
    return null;
  }
}

export function buildStoredMemberSession(input: {
  memberId: number;
  kccUserId: string;
  email: string | null;
  name: string | null;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expiresAt?: number;
}): StoredMemberSession {
  return {
    memberId: input.memberId,
    kccUserId: input.kccUserId,
    email: input.email,
    name: input.name,
    accessToken: input.accessToken,
    refreshToken: input.refreshToken,
    expiresAt: input.expiresAt ?? Date.now() + input.expiresIn * 1000,
    tokenVersion: null,
  };
}

export function memberSessionNeedsRefresh(session: StoredMemberSession, now = Date.now()) {
  return session.expiresAt - now < 5 * 60 * 1000;
}

export function toPublicMemberSession(session: StoredMemberSession): MemberSession {
  return {
    memberId: session.memberId,
    kccUserId: session.kccUserId,
    email: session.email,
    name: session.name,
  };
}
