/** Decode a JWT payload without verifying the signature (timing/exp only). */
export function decodeJwtPayload<T extends Record<string, unknown>>(
  token: string,
): T | null {
  const parts = token.split(".");
  if (parts.length < 2) return null;

  try {
    const json = Buffer.from(parts[1], "base64url").toString("utf8");
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

export function jwtExpiresAtMs(accessToken: string): number | null {
  const payload = decodeJwtPayload<{ exp?: number }>(accessToken);
  if (!payload?.exp) return null;
  return payload.exp * 1000;
}

export function jwtTokenVersion(accessToken: string): number | null {
  const payload = decodeJwtPayload<{ token_version?: number }>(accessToken);
  return typeof payload?.token_version === "number" ? payload.token_version : null;
}
