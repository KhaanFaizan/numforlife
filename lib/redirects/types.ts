export type RedirectMatchType = "exact" | "prefix";

export type RedirectRule = {
  id: string;
  sourcePath: string;
  destinationPath: string;
  matchType: RedirectMatchType;
  enabled: boolean;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

export type RedirectManifest = {
  exact: Record<string, string>;
  prefix: Array<{ prefix: string; destination: string }>;
  updatedAt: string;
};

export type RedirectInput = {
  sourcePath: string;
  destinationPath: string;
  matchType: RedirectMatchType;
  enabled?: boolean;
  note?: string | null;
};
