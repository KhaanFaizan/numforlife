import "server-only";

import type { RowDataPacket } from "mysql2";

import { getAppDbPool } from "@/lib/db/app-readonly";

import type { MemberSearchResult } from "@/lib/member/types";

type SearchRow = RowDataPacket & {
  id: number;
  nickname: string | null;
  email: string | null;
  mobile: string | null;
  kcc_user_id: string | null;
  coins: number | null;
  vip_level_name: string | null;
};

function mapSearchRow(row: SearchRow): MemberSearchResult {
  return {
    id: row.id,
    nickname: row.nickname?.trim() || null,
    email: row.email?.trim() || null,
    mobile: row.mobile?.trim() || null,
    kccUserId: row.kcc_user_id?.trim() || null,
    vipLevelName: row.vip_level_name?.trim() || null,
    coins: Number(row.coins ?? 0),
  };
}

const BASE_SELECT = `
  SELECT m.id, m.nickname, m.email, m.mobile, m.kcc_user_id, m.coins,
         vl.name AS vip_level_name
    FROM yzn_member m
    LEFT JOIN yzn_vip_levels vl ON vl.id = m.vip_level_id
`;

/** Read-only member search for admin support — never writes to app_numforlife_com. */
export async function searchMembers(
  query: string,
  limit = 20,
): Promise<MemberSearchResult[]> {
  const pool = getAppDbPool();
  if (!pool) return [];

  const trimmed = query.trim();
  if (!trimmed) return [];

  const cappedLimit = Math.min(Math.max(limit, 1), 50);

  if (/^\d+$/.test(trimmed)) {
    const [rows] = await pool.query<SearchRow[]>(
      `${BASE_SELECT} WHERE m.id = ? LIMIT ?`,
      [Number(trimmed), cappedLimit],
    );
    return rows.map(mapSearchRow);
  }

  if (trimmed.includes("@")) {
    const [rows] = await pool.query<SearchRow[]>(
      `${BASE_SELECT} WHERE m.email LIKE ? ORDER BY m.id DESC LIMIT ?`,
      [`%${trimmed}%`, cappedLimit],
    );
    return rows.map(mapSearchRow);
  }

  if (/^[0-9a-f-]{20,}$/i.test(trimmed)) {
    const [rows] = await pool.query<SearchRow[]>(
      `${BASE_SELECT} WHERE m.kcc_user_id = ? LIMIT ?`,
      [trimmed, cappedLimit],
    );
    return rows.map(mapSearchRow);
  }

  const like = `%${trimmed}%`;
  const [rows] = await pool.query<SearchRow[]>(
    `${BASE_SELECT}
      WHERE m.nickname LIKE ? OR m.mobile LIKE ? OR m.email LIKE ?
      ORDER BY m.id DESC
      LIMIT ?`,
    [like, like, like, cappedLimit],
  );

  return rows.map(mapSearchRow);
}
