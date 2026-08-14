import "server-only";

import { AuthError } from "./errors";
import { hasAdminPermission, type AdminPermission } from "./permissions";
import { getAdminSession } from "./service";
import type { AdminSession } from "./types";

/** Require an authenticated admin session in route handlers. */
export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();

  if (!session) {
    throw new AuthError("UNAUTHORIZED", "Authentication required.", 401);
  }

  return session;
}

/** Require an authenticated admin with a specific permission. */
export async function requireAdminPermission(
  permission: AdminPermission,
): Promise<AdminSession> {
  const session = await requireAdminSession();

  if (!hasAdminPermission(session.role, permission)) {
    throw new AuthError(
      "FORBIDDEN",
      "You do not have permission to perform this action.",
      403,
    );
  }

  return session;
}
