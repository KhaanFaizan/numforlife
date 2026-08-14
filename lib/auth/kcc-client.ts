import "server-only";

import { AuthError } from "./errors";
import { createPkcePair } from "./pkce";
import type {
  AuthProvider,
  KccTokenSet,
  KccUserInfo,
  LoginCredentials,
} from "./types";

const DEFAULT_BASE_URL = "https://auth.bigkpay.com";

function kccBaseUrl() {
  return process.env.KCC_ID_BASE_URL ?? DEFAULT_BASE_URL;
}

function kccClientId() {
  return process.env.KCC_CLIENT_ID ?? "shuyi";
}

type KccErrorBody = {
  error?: string;
  error_description?: string;
  message?: string;
  requires_2fa?: boolean;
};

async function readKccError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as KccErrorBody;
    return body.error_description ?? body.message ?? body.error ?? response.statusText;
  } catch {
    return response.statusText;
  }
}

function mapTokenResponse(body: Record<string, unknown>): KccTokenSet {
  if (body.requires_2fa) {
    throw new AuthError(
      "TWO_FACTOR_REQUIRED",
      "Two-factor authentication is required for this account.",
      403,
    );
  }

  const accessToken = body.access_token;
  const idToken = body.id_token;
  const refreshToken = body.refresh_token;
  const expiresIn = body.expires_in;
  const scope = body.scope;

  if (
    typeof accessToken !== "string" ||
    typeof idToken !== "string" ||
    typeof refreshToken !== "string" ||
    typeof expiresIn !== "number"
  ) {
    throw new AuthError("INVALID_TOKEN_RESPONSE", "Unexpected token response from KCC ID.", 502);
  }

  return {
    accessToken,
    idToken,
    refreshToken,
    expiresIn,
    scope: typeof scope === "string" ? scope : "openid profile email",
  };
}

/** KCC ID auth adapter (PKCE authorize + token exchange). */
export class KccAuthProvider implements AuthProvider {
  async login(credentials: LoginCredentials): Promise<KccTokenSet> {
    const { verifier, challenge } = createPkcePair();
    const clientId = kccClientId();

    const authorizeResponse = await fetch(`${kccBaseUrl()}/kccid/v1/authorize`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        identifier: credentials.identifier,
        password: credentials.password,
        client_id: clientId,
        scope: "openid profile email",
        code_challenge: challenge,
        code_challenge_method: "S256",
      }),
    });

    if (authorizeResponse.status === 429) {
      throw new AuthError(
        "RATE_LIMITED",
        "Too many login attempts. Please wait a minute and try again.",
        429,
      );
    }

    if (!authorizeResponse.ok) {
      const message = await readKccError(authorizeResponse);
      throw new AuthError(
        "INVALID_CREDENTIALS",
        message || "Invalid email or password.",
        authorizeResponse.status === 401 ? 401 : 502,
      );
    }

    const authorizeBody = (await authorizeResponse.json()) as { code?: string };
    if (!authorizeBody.code) {
      throw new AuthError("INVALID_AUTHORIZE_RESPONSE", "Missing authorization code.", 502);
    }

    return this.exchangeAuthorizationCode(authorizeBody.code, verifier);
  }

  async refresh(refreshToken: string): Promise<KccTokenSet> {
    const response = await fetch(`${kccBaseUrl()}/kccid/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: kccClientId(),
      }),
    });

    if (response.status === 401) {
      throw new AuthError(
        "SESSION_EXPIRED",
        "Your session expired. Please sign in again.",
        401,
      );
    }

    if (!response.ok) {
      const message = await readKccError(response);
      throw new AuthError("REFRESH_FAILED", message || "Unable to refresh session.", 502);
    }

    return mapTokenResponse((await response.json()) as Record<string, unknown>);
  }

  async logout(refreshToken: string): Promise<void> {
    await fetch(`${kccBaseUrl()}/kccid/v1/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        refresh_token: refreshToken,
        client_id: kccClientId(),
      }),
    }).catch(() => {
      // Best-effort remote logout; local session is cleared regardless.
    });
  }

  async getUserInfo(accessToken: string): Promise<KccUserInfo> {
    const response = await fetch(`${kccBaseUrl()}/kccid/v1/userinfo`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      throw new AuthError(
        "SESSION_EXPIRED",
        "Your session expired. Please sign in again.",
        401,
      );
    }

    if (!response.ok) {
      const message = await readKccError(response);
      throw new AuthError("USERINFO_FAILED", message || "Unable to load user profile.", 502);
    }

    const body = (await response.json()) as Record<string, unknown>;

    if (typeof body.sub !== "string") {
      throw new AuthError("USERINFO_FAILED", "Invalid user profile response.", 502);
    }

    return {
      sub: body.sub,
      email: typeof body.email === "string" ? body.email : undefined,
      emailVerified:
        typeof body.email_verified === "boolean" ? body.email_verified : undefined,
      name: typeof body.name === "string" ? body.name : undefined,
      preferredUsername:
        typeof body.preferred_username === "string"
          ? body.preferred_username
          : undefined,
      role: typeof body.role === "string" ? body.role : undefined,
      tokenType: typeof body.token_type === "string" ? body.token_type : undefined,
    };
  }

  private async exchangeAuthorizationCode(
    code: string,
    codeVerifier: string,
  ): Promise<KccTokenSet> {
    const response = await fetch(`${kccBaseUrl()}/kccid/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        client_id: kccClientId(),
        code_verifier: codeVerifier,
      }),
    });

    if (!response.ok) {
      const message = await readKccError(response);
      throw new AuthError(
        "TOKEN_EXCHANGE_FAILED",
        message || "Unable to complete sign in.",
        response.status === 401 ? 401 : 502,
      );
    }

    return mapTokenResponse((await response.json()) as Record<string, unknown>);
  }
}

export function createAuthProvider(): AuthProvider {
  const provider = process.env.AUTH_PROVIDER ?? "kcc";

  if (provider === "kcc") {
    return new KccAuthProvider();
  }

  throw new AuthError(
    "PROVIDER_UNSUPPORTED",
    `Auth provider "${provider}" is not configured.`,
    500,
  );
}
