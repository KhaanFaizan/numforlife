import "server-only";

import { AuthError } from "../errors";
import type {
  AuthProvider,
  KccTokenSet,
  KccUserInfo,
  LoginCredentials,
} from "../types";

/**
 * Placeholder for the dual-path legacy app login (see PROJECT-KNOWLEDGE-HANDOFF §10).
 * Not enabled until the client chooses option (b).
 */
export class LegacyAuthProvider implements AuthProvider {
  async login(_credentials: LoginCredentials): Promise<KccTokenSet> {
    throw new AuthError(
      "LEGACY_NOT_ENABLED",
      "Legacy app login is not enabled on the website yet.",
      501,
    );
  }

  async refresh(_refreshToken: string): Promise<KccTokenSet> {
    throw new AuthError("LEGACY_NOT_ENABLED", "Legacy session refresh is not enabled.", 501);
  }

  async logout(_refreshToken: string): Promise<void> {
    return;
  }

  async getUserInfo(_accessToken: string): Promise<KccUserInfo> {
    throw new AuthError("LEGACY_NOT_ENABLED", "Legacy user profile is not enabled.", 501);
  }
}
