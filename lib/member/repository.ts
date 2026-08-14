import "server-only";

import type { RowDataPacket } from "mysql2";

import { getAppDbPool } from "@/lib/db/app-readonly";
import {
  formatBirthDateParts,
  formatRecordLabel,
} from "@/lib/member/labels";
import type {
  CalculationRecordSummary,
  CoinLogEntry,
  MemberDashboardData,
  MemberMembership,
  MemberProfile,
} from "@/lib/member/types";
import { getEntitlementMatrix } from "@/lib/membership/repository";
import type { MembershipTierKey } from "@/lib/membership/types";

type MemberRow = RowDataPacket & {
  id: number;
  kcc_user_id: string;
  nickname: string | null;
  email: string | null;
  mobile: string | null;
  avatar: string | null;
  sex: number | null;
  year: number | null;
  month: number | null;
  day: number | null;
  birth_time: string | null;
  coins: number | null;
  point: number | null;
  vip_level_id: number | null;
  vip_subscription_start: string | null;
  vip_subscription_end: string | null;
  vip_level_name: string | null;
};

type RecordRow = RowDataPacket & {
  id: number;
  records_type: number;
  type: number;
  tarot_type: string | null;
  year: number | null;
  month: number | null;
  day: number | null;
  add_time: number | null;
};

type CoinRow = RowDataPacket & {
  id: number;
  type: number;
  coin: number | null;
  coins: number | null;
  add_time: number | null;
};

type CoinConfigRow = RowDataPacket & {
  type: number;
  name: string | null;
  title: string | null;
};

const TIER_KEYS: Record<number, MembershipTierKey> = {
  1: "base",
  2: "elite",
  3: "supreme",
};

function formatTimestamp(value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null;

  if (value instanceof Date) {
    return value.toISOString();
  }

  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric > 0) {
    const ms = numeric > 1_000_000_000_000 ? numeric : numeric * 1000;
    return new Date(ms).toISOString();
  }

  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? null : new Date(parsed).toISOString();
  }

  return null;
}

function mapProfile(row: MemberRow): MemberProfile {
  return {
    id: row.id,
    nickname: row.nickname?.trim() || null,
    email: row.email?.trim() || null,
    mobile: row.mobile?.trim() || null,
    avatar: row.avatar?.trim() || null,
    sex: row.sex ?? null,
    birthDate:
      formatBirthDateParts(row.year, row.month, row.day) ??
      (row.birth_time ? row.birth_time.slice(0, 10) : null),
    coins: Number(row.coins ?? 0),
    points: Number(row.point ?? 0),
  };
}

async function shopDiscountForTier(tier: MembershipTierKey | null): Promise<number | null> {
  const matrix = await getEntitlementMatrix();
  const discountRow = matrix.find((row) => row.id === 17);
  if (!discountRow || !tier) return null;

  if (tier === "base") return discountRow.base.value;
  if (tier === "elite") return discountRow.elite.value;
  return discountRow.supreme.value;
}

function mapMembership(row: MemberRow, shopDiscountPercent: number | null): MemberMembership {
  const levelId = row.vip_level_id ?? null;
  const tierKey = levelId ? TIER_KEYS[levelId] ?? null : null;

  return {
    levelId,
    levelName: row.vip_level_name?.trim() || (tierKey === "elite" ? "精英会员" : tierKey === "supreme" ? "至尊会员" : "基础会员"),
    subscriptionStart: formatTimestamp(row.vip_subscription_start),
    subscriptionEnd: formatTimestamp(row.vip_subscription_end),
    isLifetime: row.vip_subscription_end === null && levelId !== null && levelId > 1,
    shopDiscountPercent: tierKey ? shopDiscountPercent : 0,
  };
}

function mapRecord(row: RecordRow): CalculationRecordSummary {
  const birthDate = formatBirthDateParts(row.year, row.month, row.day);

  return {
    id: row.id,
    recordsType: row.records_type,
    mode: row.type,
    tarotType: row.tarot_type?.trim() || null,
    birthDate,
    label: formatRecordLabel({
      recordsType: row.records_type,
      mode: row.type,
      tarotType: row.tarot_type,
    }),
    createdAt: formatTimestamp(row.add_time),
  };
}

function mapCoinEntry(row: CoinRow, labels: Map<number, string>): CoinLogEntry {
  const amount = Number(row.coin ?? row.coins ?? 0);

  return {
    id: row.id,
    type: row.type,
    amount,
    label: labels.get(row.type) ?? `类型 ${row.type}`,
    createdAt: formatTimestamp(row.add_time),
  };
}

export async function findMemberByKccUserId(kccUserId: string): Promise<MemberRow | null> {
  const pool = getAppDbPool();
  if (!pool) return null;

  const [rows] = await pool.query<MemberRow[]>(
    `SELECT m.id, m.kcc_user_id, m.nickname, m.email, m.mobile, m.avatar, m.sex,
            m.year, m.month, m.day, m.birth_time, m.coins, m.point,
            m.vip_level_id, m.vip_subscription_start, m.vip_subscription_end,
            vl.name AS vip_level_name
       FROM yzn_member m
       LEFT JOIN yzn_vip_levels vl ON vl.id = m.vip_level_id
      WHERE m.kcc_user_id = ?
      LIMIT 1`,
    [kccUserId],
  );

  return rows[0] ?? null;
}

async function loadCoinLabels(pool: NonNullable<ReturnType<typeof getAppDbPool>>) {
  const labels = new Map<number, string>();

  try {
    const [rows] = await pool.query<CoinConfigRow[]>(
      "SELECT type, name, title FROM yzn_coin_config ORDER BY type ASC",
    );

    for (const row of rows) {
      labels.set(row.type, (row.name ?? row.title ?? "").trim() || `类型 ${row.type}`);
    }
  } catch {
    // Optional lookup — balance still renders without history labels.
  }

  return labels;
}

async function loadRecentRecords(
  pool: NonNullable<ReturnType<typeof getAppDbPool>>,
  memberId: number,
) {
  try {
    const [rows] = await pool.query<RecordRow[]>(
      `SELECT id, records_type, type, tarot_type, year, month, day, add_time
         FROM yzn_records
        WHERE userid = ?
        ORDER BY id DESC
        LIMIT 10`,
      [memberId],
    );

    return rows.map(mapRecord);
  } catch {
    return [];
  }
}

async function loadCoinLog(
  pool: NonNullable<ReturnType<typeof getAppDbPool>>,
  memberId: number,
  labels: Map<number, string>,
) {
  try {
    const [rows] = await pool.query<CoinRow[]>(
      `SELECT id, type, coin, add_time
         FROM yzn_coin_log
        WHERE userid = ?
        ORDER BY id DESC
        LIMIT 8`,
      [memberId],
    );

    return rows.map((row) => mapCoinEntry(row, labels));
  } catch {
    try {
      const [rows] = await pool.query<CoinRow[]>(
        `SELECT id, type, coins, add_time
           FROM yzn_coin_log
          WHERE user_id = ?
          ORDER BY id DESC
          LIMIT 8`,
        [memberId],
      );

      return rows.map((row) => mapCoinEntry(row, labels));
    } catch {
      return [];
    }
  }
}

export async function getMemberDashboard(memberId: number): Promise<MemberDashboardData | null> {
  const pool = getAppDbPool();
  if (!pool) return null;

  const [rows] = await pool.query<MemberRow[]>(
    `SELECT m.id, m.kcc_user_id, m.nickname, m.email, m.mobile, m.avatar, m.sex,
            m.year, m.month, m.day, m.birth_time, m.coins, m.point,
            m.vip_level_id, m.vip_subscription_start, m.vip_subscription_end,
            vl.name AS vip_level_name
       FROM yzn_member m
       LEFT JOIN yzn_vip_levels vl ON vl.id = m.vip_level_id
      WHERE m.id = ?
      LIMIT 1`,
    [memberId],
  );

  const row = rows[0];
  if (!row) return null;

  const tierKey = row.vip_level_id ? TIER_KEYS[row.vip_level_id] ?? "base" : "base";
  const shopDiscountPercent = await shopDiscountForTier(tierKey);
  const coinLabels = await loadCoinLabels(pool);

  const [records, coinLog] = await Promise.all([
    loadRecentRecords(pool, memberId),
    loadCoinLog(pool, memberId, coinLabels),
  ]);

  return {
    profile: mapProfile(row),
    membership: mapMembership(row, shopDiscountPercent),
    records,
    coinLog,
  };
}