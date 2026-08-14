export type AdminRole =
  | "super_admin"
  | "content_editor"
  | "marketing_admin"
  | "support_admin"
  | "developer_admin"
  | "read_only_admin";

export type AdminUserRecord = {
  id: string;
  kccUserId: string;
  email: string;
  role: AdminRole;
  status: "active" | "suspended";
  createdAt: string;
  updatedAt: string;
};

/** Safe subset exposed to the admin UI — never includes tokens. */
export type AdminSession = {
  kccUserId: string;
  email: string;
  name: string | null;
  role: AdminRole;
};

export type KccTokenSet = {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
  scope: string;
};

export type KccUserInfo = {
  sub: string;
  email?: string;
  emailVerified?: boolean;
  name?: string;
  preferredUsername?: string;
  role?: string;
  tokenType?: string;
};

export type LoginCredentials = {
  identifier: string;
  password: string;
};

export type MemberSession = {
  memberId: number;
  kccUserId: string;
  email: string | null;
  name: string | null;
};

export interface AuthProvider {
  login(credentials: LoginCredentials): Promise<KccTokenSet>;
  refresh(refreshToken: string): Promise<KccTokenSet>;
  logout(refreshToken: string): Promise<void>;
  getUserInfo(accessToken: string): Promise<KccUserInfo>;
}
