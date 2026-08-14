import "server-only";

import { cookies } from "next/headers";
import {
  requireActiveAdminUser,
  upsertAdminUserEmail,
} from "./admin-users";
import { AuthError } from "./errors";
import { createAuthProvider } from "./kcc-client";
import { consumeLoginAttempt, getClientIp } from "./rate-limit";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  buildStoredSession,
  decryptSession,
  encryptSession,
  sessionNeedsRefresh,
  toPublicSession,
  type StoredAdminSession,
} from "./session";
import type { AdminSession, LoginCredentials } from "./types";

async function readStoredSession(): Promise<StoredAdminSession | null> {
  const raw = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!raw) return null;
  return decryptSession(raw);
}

export async function writeSessionCookie(session: StoredAdminSession) {
  (await cookies()).set(ADMIN_SESSION_COOKIE, encryptSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
}

export async function clearSessionCookie() {
  (await cookies()).delete(ADMIN_SESSION_COOKIE);
}

async function refreshStoredSession(
  session: StoredAdminSession,
): Promise<StoredAdminSession> {
  const provider = createAuthProvider();
  const tokens = await provider.refresh(session.refreshToken);
  const userInfo = await provider.getUserInfo(tokens.accessToken);
  const admin = requireActiveAdminUser(userInfo.sub);

  return buildStoredSession({
    kccUserId: userInfo.sub,
    email: userInfo.email ?? admin.email,
    name: userInfo.name ?? userInfo.preferredUsername ?? null,
    role: admin.role,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiresIn: tokens.expiresIn,
  });
}

/** Resolve the current admin session, refreshing tokens when close to expiry. */
export async function getAdminSession(): Promise<AdminSession | null> {
  let session = await readStoredSession();
  if (!session) return null;

  try {
    if (sessionNeedsRefresh(session)) {
      session = await refreshStoredSession(session);
      await writeSessionCookie(session);
    }

    const admin = requireActiveAdminUser(session.kccUserId);
    return toPublicSession({ ...session, role: admin.role });
  } catch {
    await clearSessionCookie();
    return null;
  }
}

export async function loginAdmin(
  request: Request,
  credentials: LoginCredentials,
): Promise<AdminSession> {
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

  let admin;
  try {
    admin = requireActiveAdminUser(userInfo.sub);
  } catch (error) {
    if (error instanceof Error && error.message === "ADMIN_NOT_REGISTERED") {
      throw new AuthError(
        "ADMIN_NOT_REGISTERED",
        "This account is not authorized to access the admin panel.",
        403,
      );
    }

    if (error instanceof Error && error.message === "ADMIN_SUSPENDED") {
      throw new AuthError(
        "ADMIN_SUSPENDED",
        "This admin account has been suspended.",
        403,
      );
    }

    throw error;
  }

  if (userInfo.email && userInfo.email !== admin.email) {
    upsertAdminUserEmail(userInfo.sub, userInfo.email);
  }

  const stored = buildStoredSession({
    kccUserId: userInfo.sub,
    email: userInfo.email ?? admin.email,
    name: userInfo.name ?? userInfo.preferredUsername ?? null,
    role: admin.role,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiresIn: tokens.expiresIn,
  });

  await writeSessionCookie(stored);
  return toPublicSession(stored);
}

export async function logoutAdmin() {
  const session = await readStoredSession();

  if (session) {
    const provider = createAuthProvider();
    await provider.logout(session.refreshToken);
  }

  await clearSessionCookie();
}
