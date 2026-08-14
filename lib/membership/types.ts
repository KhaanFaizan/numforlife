export type MembershipTierKey = "base" | "elite" | "supreme";

export type BillingPeriodKey =
  | "month"
  | "year"
  | "three_year"
  | "five_year"
  | "lifetime";

export type MembershipPlan = {
  period: BillingPeriodKey;
  label: string;
  fee: number;
  giftCoins: number | null;
  recommended: boolean;
  info: string | null;
};

export type MembershipTier = {
  id: number;
  key: MembershipTierKey;
  name: string;
  plans: MembershipPlan[];
};

export type EntitlementRow = {
  id: number;
  name: string;
  notes: string | null;
  sortOrder: number;
  base: { label: string; value: number };
  elite: { label: string; value: number };
  supreme: { label: string; value: number };
};

export type MembershipCatalog = {
  tiers: MembershipTier[];
  entitlements: EntitlementRow[];
  fetchedAt: string;
  source: "database" | "api-fallback";
};
