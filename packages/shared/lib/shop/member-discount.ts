import "server-only";

import type { RowDataPacket } from "mysql2";

import { getMemberSession } from "@/lib/auth/member-service";
import { getAppDbPool } from "@/lib/db/app-readonly";
import { getEntitlementValue, getEntitlementMatrix } from "@/lib/membership/repository";
import type { MembershipTierKey } from "@/lib/membership/types";

const TIER_KEYS: Record<number, MembershipTierKey> = {
  1: "base",
  2: "elite",
  3: "supreme",
};

const TIER_LABELS: Record<MembershipTierKey, string> = {
  base: "基础会员",
  elite: "精英会员",
  supreme: "至尊会员",
};

export type ShopMemberPricing = {
  discountPercent: number;
  tierLabel: string;
  isLoggedIn: boolean;
};

export async function getShopMemberPricing(): Promise<ShopMemberPricing> {
  const session = await getMemberSession();

  if (!session) {
    return {
      discountPercent: 0,
      tierLabel: "访客",
      isLoggedIn: false,
    };
  }

  const pool = getAppDbPool();
  if (!pool) {
    return {
      discountPercent: 0,
      tierLabel: "会员",
      isLoggedIn: true,
    };
  }

  const [rows] = await pool.query<Array<RowDataPacket & { vip_level_id: number | null }>>(
    "SELECT vip_level_id FROM yzn_member WHERE id = ? LIMIT 1",
    [session.memberId],
  );

  const levelId = rows[0]?.vip_level_id ?? 1;
  const tierKey = TIER_KEYS[levelId] ?? "base";
  const matrix = await getEntitlementMatrix();
  const discountPercent = getEntitlementValue(matrix, 17, tierKey) ?? 0;

  return {
    discountPercent: Math.max(0, discountPercent),
    tierLabel: TIER_LABELS[tierKey],
    isLoggedIn: true,
  };
}
