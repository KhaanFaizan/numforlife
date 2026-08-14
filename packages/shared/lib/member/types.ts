export type MemberProfile = {
  id: number;
  nickname: string | null;
  email: string | null;
  mobile: string | null;
  avatar: string | null;
  sex: number | null;
  birthDate: string | null;
  coins: number;
  points: number;
};

export type MemberMembership = {
  levelId: number | null;
  levelName: string;
  subscriptionStart: string | null;
  subscriptionEnd: string | null;
  isLifetime: boolean;
  shopDiscountPercent: number | null;
};

export type CalculationRecordSummary = {
  id: number;
  recordsType: number;
  mode: number;
  tarotType: string | null;
  birthDate: string | null;
  label: string;
  createdAt: string | null;
};

export type CoinLogEntry = {
  id: number;
  type: number;
  amount: number;
  label: string;
  createdAt: string | null;
};

export type MemberDashboardData = {
  profile: MemberProfile;
  membership: MemberMembership;
  records: CalculationRecordSummary[];
  coinLog: CoinLogEntry[];
};

export type MemberSearchResult = {
  id: number;
  nickname: string | null;
  email: string | null;
  mobile: string | null;
  kccUserId: string | null;
  vipLevelName: string | null;
  coins: number;
};
