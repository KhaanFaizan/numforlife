import "server-only";

import type { RowDataPacket } from "mysql2";

import { getAppDbPool } from "@/lib/db/app-readonly";
import {
  getEntitlementMatrix,
  getEntitlementValue,
} from "@/lib/membership/repository";
import type { MembershipTierKey } from "@/lib/membership/types";
import { ANONYMOUS_DAILY_CALCULATIONS } from "@/lib/rate-limit";

/** Production `yzn_vip_purview` ids referenced in IMPLEMENTATION-PLAN §3.3. */
export const PURVIEW = {
  MAIN_PERSONALITY: 3,
  FIVE_ELEMENTS: 4,
  NUMBER_GROUPS: 5,
  CALC_RECORDS: 6,
  SHOP_DISCOUNT: 17,
} as const;

const TIER_KEYS: Record<number, MembershipTierKey> = {
  1: "base",
  2: "elite",
  3: "supreme",
};

export type NumerologyEntitlements = {
  tier: MembershipTierKey;
  tierLabel: string;
  dailyCalculationLimit: number;
  groupPreviewLimit: number | null;
};

const TIER_LABELS: Record<MembershipTierKey, string> = {
  base: "基础会员",
  elite: "精英会员",
  supreme: "至尊会员",
};

function tierFromLevelId(levelId: number | null | undefined): MembershipTierKey {
  if (levelId === 2) return "elite";
  if (levelId === 3) return "supreme";
  return "base";
}

/** 999 = unlimited in the app entitlement matrix. */
export function isUnlimitedEntitlement(value: number | null | undefined): boolean {
  return value === null || value === undefined || value >= 999;
}

/**
 * Map purview value to how many numerology groups the website preview may show.
 * Returns `null` when all groups should render.
 */
export function numerologyGroupPreviewLimit(value: number | null | undefined): number | null {
  if (value === null || value === undefined) return 10;
  if (isUnlimitedEntitlement(value)) return null;
  if (value <= 0) return 0;
  return value;
}

/**
 * Daily website calculation allowance.
 * Anonymous visitors keep production's 2/day cap; members inherit 测算记录 limits.
 */
export function dailyCalculationLimitFromPurview(value: number | null | undefined): number {
  if (isUnlimitedEntitlement(value)) return 999;
  if (value === null || value === undefined || value <= 0) return ANONYMOUS_DAILY_CALCULATIONS;
  return value;
}

export async function getMemberNumerologyEntitlements(
  memberId: number,
): Promise<NumerologyEntitlements | null> {
  const pool = getAppDbPool();
  if (!pool) return null;

  const [rows] = await pool.query<Array<RowDataPacket & { vip_level_id: number | null }>>(
    "SELECT vip_level_id FROM yzn_member WHERE id = ? LIMIT 1",
    [memberId],
  );

  const levelId = rows[0]?.vip_level_id ?? 1;
  const tier = tierFromLevelId(levelId);
  const matrix = await getEntitlementMatrix();

  const recordsValue = getEntitlementValue(matrix, PURVIEW.CALC_RECORDS, tier);
  const groupsValue = getEntitlementValue(matrix, PURVIEW.NUMBER_GROUPS, tier);

  return {
    tier,
    tierLabel: TIER_LABELS[tier],
    dailyCalculationLimit: dailyCalculationLimitFromPurview(recordsValue),
    groupPreviewLimit: numerologyGroupPreviewLimit(groupsValue),
  };
}

/** Anonymous visitors — production baseline. */
export function anonymousNumerologyEntitlements(): NumerologyEntitlements {
  return {
    tier: "base",
    tierLabel: "访客",
    dailyCalculationLimit: ANONYMOUS_DAILY_CALCULATIONS,
    groupPreviewLimit: 10,
  };
}
