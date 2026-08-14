import type { AdminRole } from "./types";

export type AdminPermission =
  | "cms:read"
  | "cms:write"
  | "cms:publish"
  | "cms:reset"
  | "support:read"
  | "ops:read"
  | "ops:write";

const ROLE_PERMISSIONS: Record<AdminRole, readonly AdminPermission[]> = {
  super_admin: [
    "cms:read",
    "cms:write",
    "cms:publish",
    "cms:reset",
    "support:read",
    "ops:read",
    "ops:write",
  ],
  content_editor: ["cms:read", "cms:write", "cms:publish"],
  marketing_admin: ["cms:read", "cms:write", "cms:publish", "ops:read"],
  support_admin: ["cms:read", "support:read", "ops:read"],
  developer_admin: [
    "cms:read",
    "cms:write",
    "cms:reset",
    "support:read",
    "ops:read",
    "ops:write",
  ],
  read_only_admin: ["cms:read", "support:read", "ops:read"],
};

export function hasAdminPermission(
  role: AdminRole,
  permission: AdminPermission,
): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function listAdminPermissions(role: AdminRole): AdminPermission[] {
  return [...ROLE_PERMISSIONS[role]];
}
