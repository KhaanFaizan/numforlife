import "server-only";

import { cookies } from "next/headers";
import { AuthError } from "./errors";
import { createAuthProvider } from "./kcc-client";
import { jwtExpiresAtMs } from "./jwt";
import { consumeLoginAttempt, getClientIp } from "./rate-limit";
import { findMemberByKccUserId } from "@/lib/member/repository";
import {
  MEMBER_SESSION_COOKIE,
  MEMBER_SESSION_MAX_AGE,
  buildStoredMemberSession,
  decryptMemberSession,
  encryptMemberSession,
  memberSessionNeedsRefresh,
  toPublicMemberSession,
  type StoredMemberSession,
} from "./member-session";
import type { LoginCredentials, MemberSession } from "./types";

async function readStoredMemberSession(): Promise<StoredMemberSession | null> {
  const raw = (await cookies()).get(MEMBER_SESSION_COOKIE)?.value;
  if (!raw) return null;
  return decryptMemberSession(raw);
}

export async function writeMemberSessionCookie(session: StoredMemberSession) {
  (await cookies()).set(MEMBER_SESSION_COOKIE, encryptMemberSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MEMBER_SESSION_MAX_AGE,
  });
}

export async function clearMemberSessionCookie() {
  (await cookies()).delete(MEMBER_SESSION_COOKIE);
}

async function refreshStoredMemberSession(
  session: StoredMemberSession,
): Promise<StoredMemberSession> {
  const provider = createAuthProvider();
  const tokens = await provider.refresh(session.refreshToken);
  const userInfo = await provider.getUserInfo(tokens.accessToken);
  const member = await findMemberByKccUserId(userInfo.sub);

  if (!member) {
    throw new AuthError(
      "MEMBER_NOT_LINKED",
      "This KCC account is not linked to a 数易 member profile yet.",
      403,
    );
  }

  const expiresAt =
    jwtExpiresAtMs(tokens.accessToken) ?? Date.now() + tokens.expiresIn * 1000;

  return buildStoredMemberSession({
    memberId: member.id,
    kccUserId: userInfo.sub,
    email: userInfo.email ?? member.email,
    name: userInfo.name ?? userInfo.preferredUsername ?? member.nickname,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiresIn: tokens.expiresIn,
    expiresAt,
  });
}

export async function getMemberSession(): Promise<MemberSession | null> {
  let session = await readStoredMemberSession();
  if (!session) return null;

  try {
    if (memberSessionNeedsRefresh(session)) {
      session = await refreshStoredMemberSession(session);
      await writeMemberSessionCookie(session);
    }

    return toPublicMemberSession(session);
  } catch {
    await clearMemberSessionCookie();
    return null;
  }
}

export async function loginMember(
  request: Request,
  credentials: LoginCredentials,
): Promise<MemberSession> {
  const ip = getClientIp(request);
  const quota = consumeLoginAttempt(ip);

  if (!quota.allowed) {
    throw new AuthError(
      "RATE_LIMITED",
      "Too many login attempts. Please wait a minute and try again.",
      429,
    );
  }

  const provider = createAuthProvider();
  const tokens = await provider.login(credentials);
  const userInfo = await provider.getUserInfo(tokens.accessToken);
  const member = await findMemberByKccUserId(userInfo.sub);

  if (!member) {
    throw new AuthError(
      "MEMBER_NOT_LINKED",
      "This KCC account is not linked to a 数易 App member yet. Please register or sign in through the App first.",
      403,
    );
  }

  const stored = buildStoredMemberSession({
    memberId: member.id,
    kccUserId: userInfo.sub,
    email: userInfo.email ?? member.email,
    name: userInfo.name ?? userInfo.preferredUsername ?? member.nickname,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiresIn: tokens.expiresIn,
    expiresAt: jwtExpiresAtMs(tokens.accessToken) ?? undefined,
  });

  await writeMemberSessionCookie(stored);
  return toPublicMemberSession(stored);
}

export async function logoutMember() {
  const session = await readStoredMemberSession();

  if (session) {
    const provider = createAuthProvider();
    await provider.logout(session.refreshToken);
  }

  await clearMemberSessionCookie();
}

export async function requireMemberSession(): Promise<MemberSession> {
  const session = await getMemberSession();

  if (!session) {
    throw new AuthError("UNAUTHORIZED", "Please sign in to continue.", 401);
  }

  return session;
}
