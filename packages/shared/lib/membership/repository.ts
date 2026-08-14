import "server-only";

import type { RowDataPacket } from "mysql2";

import { getAppDbPool } from "@/lib/db/app-readonly";
import { BILLING_PERIODS, parseMoney, trimLabel } from "@/lib/membership/format";
import type {
  BillingPeriodKey,
  EntitlementRow,
  MembershipCatalog,
  MembershipPlan,
  MembershipTier,
  MembershipTierKey,
} from "@/lib/membership/types";

const TIER_KEYS: Record<number, MembershipTierKey> = {
  1: "base",
  2: "elite",
  3: "supreme",
};

type LevelRow = RowDataPacket & { id: number; name: string };

type FeeRow = RowDataPacket & {
  vip_level_id: number;
  month_fee: unknown;
  year_fee: unknown;
  three_year_fee: unknown;
  five_year_fee: unknown;
  lifetime_fee: unknown;
  month_gift_coins: unknown;
  year_gift_coins: unknown;
  three_year_gift_coins: unknown;
  five_year_gift_coins: unknown;
  lifetime_gift_coins: unknown;
};

type PurviewRow = RowDataPacket & {
  id: number;
  purview_name: string;
  purview_notes: string | null;
  order_by: number;
  base_vip_key: string;
  base_vip_value: number;
  elitist_vip_key: string;
  elitist_vip_value: number;
  supreme_vip_key: string;
  supreme_vip_value: number;
};

type AppApiEnvelope<T> = {
  code: number;
  msg: string;
  data: T;
};

type AppPurviewRow = {
  id: number;
  purview_name: string;
  purview_notes?: string;
  order_by: number;
  base_vip_key: string;
  base_vip_value: number;
  elitist_vip_key: string;
  elitist_vip_value: number;
  supreme_vip_key: string;
  supreme_vip_value: number;
};

function planFromFeeRow(row: FeeRow, period: BillingPeriodKey, label: string): MembershipPlan {
  const feeKey = `${period}_fee` as keyof FeeRow;
  const giftKey = `${period}_gift_coins` as keyof FeeRow;

  const fee = parseMoney(row[feeKey]);
  const giftRaw = parseMoney(row[giftKey]);

  return {
    period,
    label,
    fee,
    giftCoins: giftRaw > 0 ? giftRaw : null,
    recommended: period === "five_year" && fee > 0,
    info: null,
  };
}

function buildTier(level: LevelRow, fee: FeeRow | undefined): MembershipTier {
  const key = TIER_KEYS[level.id] ?? "base";
  const plans =
    fee === undefined
      ? []
      : BILLING_PERIODS.map(({ key: period, label }) => planFromFeeRow(fee, period, label));

  return {
    id: level.id,
    key,
    name: trimLabel(level.name),
    plans,
  };
}

function mapPurviewRows(rows: PurviewRow[]): EntitlementRow[] {
  return rows
    .map((row) => ({
      id: row.id,
      name: trimLabel(row.purview_name),
      notes: trimLabel(row.purview_notes) || null,
      sortOrder: row.order_by,
      base: { label: trimLabel(row.base_vip_key), value: Number(row.base_vip_value) },
      elite: { label: trimLabel(row.elitist_vip_key), value: Number(row.elitist_vip_value) },
      supreme: { label: trimLabel(row.supreme_vip_key), value: Number(row.supreme_vip_value) },
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
}

async function fetchPurviewFromApi(): Promise<EntitlementRow[]> {
  const response = await fetch("https://app.numforlife.com/api/apis/getVipPurview", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "",
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`getVipPurview HTTP ${response.status}`);
  }

  const payload = (await response.json()) as AppApiEnvelope<AppPurviewRow[]>;
  if (payload.code !== 1 || !Array.isArray(payload.data)) {
    throw new Error(payload.msg || "getVipPurview failed");
  }

  return mapPurviewRows(payload.data as unknown as PurviewRow[]);
}

async function fetchCatalogFromDatabase(): Promise<MembershipCatalog | null> {
  const pool = getAppDbPool();
  if (!pool) return null;

  const [levels] = await pool.query<LevelRow[]>(
    "SELECT id, name FROM yzn_vip_levels ORDER BY id ASC",
  );

  const [fees] = await pool.query<FeeRow[]>(
    `SELECT vip_level_id,
            month_fee, year_fee, three_year_fee, five_year_fee, lifetime_fee,
            month_gift_coins, year_gift_coins, three_year_gift_coins,
            five_year_gift_coins, lifetime_gift_coins
       FROM yzn_vip_fee
      ORDER BY vip_level_id ASC`,
  );

  const [purview] = await pool.query<PurviewRow[]>(
    `SELECT id, purview_name, purview_notes, order_by,
            base_vip_key, base_vip_value,
            elitist_vip_key, elitist_vip_value,
            supreme_vip_key, supreme_vip_value
       FROM yzn_vip_purview
      ORDER BY order_by ASC, id ASC`,
  );

  const feeByLevel = new Map(fees.map((row) => [row.vip_level_id, row]));

  return {
    tiers: levels.map((level) => buildTier(level, feeByLevel.get(level.id))),
    entitlements: mapPurviewRows(purview),
    fetchedAt: new Date().toISOString(),
    source: "database",
  };
}

/** Membership pricing + entitlement matrix from the app database, with API fallback for benefits. */
export async function getMembershipCatalog(): Promise<MembershipCatalog | null> {
  try {
    const catalog = await fetchCatalogFromDatabase();
    if (catalog) return catalog;
  } catch (error) {
    console.error("[membership] database read failed:", error);
  }

  try {
    const entitlements = await fetchPurviewFromApi();
    return {
      tiers: [],
      entitlements,
      fetchedAt: new Date().toISOString(),
      source: "api-fallback",
    };
  } catch (error) {
    console.error("[membership] API fallback failed:", error);
    return null;
  }
}

/** Entitlement matrix for gating helpers — prefers the public app API (D-006). */
export async function getEntitlementMatrix(): Promise<EntitlementRow[]> {
  try {
    return await fetchPurviewFromApi();
  } catch (error) {
    console.error("[membership] getVipPurview failed:", error);
  }

  const catalog = await fetchCatalogFromDatabase().catch(() => null);
  return catalog?.entitlements ?? [];
}

export function getEntitlementValue(
  matrix: EntitlementRow[],
  purviewId: number,
  tier: MembershipTierKey,
): number | null {
  const row = matrix.find((entry) => entry.id === purviewId);
  if (!row) return null;

  if (tier === "base") return row.base.value;
  if (tier === "elite") return row.elite.value;
  return row.supreme.value;
}
