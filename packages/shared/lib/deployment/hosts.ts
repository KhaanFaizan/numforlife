/** Hostnames for UAT split routing (see deploy/uat/nginx-uat.conf.example). */

function normalizeHost(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  return value.trim().toLowerCase().replace(/:\d+$/, "");
}

export const publicHost = normalizeHost(process.env.PUBLIC_HOST);
export const adminHost = normalizeHost(process.env.ADMIN_HOST);

export function hostFromRequest(requestHost: string | null): string | null {
  if (!requestHost) return null;
  return normalizeHost(requestHost.split(",")[0]?.trim());
}

export function isAdminHost(requestHost: string | null): boolean {
  const host = hostFromRequest(requestHost);
  return Boolean(adminHost && host && host === adminHost);
}

export function isPublicHost(requestHost: string | null): boolean {
  const host = hostFromRequest(requestHost);
  return Boolean(publicHost && host && host === publicHost);
}

export function adminOrigin(): string {
  const base = process.env.SITE_URL?.replace(/\/$/, "") ?? "https://uat.numforlife.com";
  if (adminHost) {
    const protocol = base.startsWith("http") ? new URL(base).protocol : "https:";
    return `${protocol}//${adminHost}`;
  }
  return base;
}

export function publicOrigin(): string {
  const base = process.env.SITE_URL?.replace(/\/$/, "") ?? "https://uat.numforlife.com";
  if (publicHost) {
    const protocol = base.startsWith("http") ? new URL(base).protocol : "https:";
    return `${protocol}//${publicHost}`;
  }
  return base;
}
