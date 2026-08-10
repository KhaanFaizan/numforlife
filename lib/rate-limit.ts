import "server-only";

/**
 * Calculation quotas.
 *
 * Two reasons this exists, and the second is the urgent one:
 *
 * 1. Production already limits anonymous visitors to two calculations per day
 *    ("未登录用户每日最多可进行 2 次测算"). Dropping that on the new site would
 *    silently change the conversion funnel.
 *
 * 2. The numerology engine calls the upstream WordPress calculator server-side,
 *    so every visitor's request reaches it from ONE ip. Upstream's own
 *    per-visitor limit cannot see our users, meaning without a quota here the
 *    new site could pile load onto the client's production WordPress and look
 *    like abuse. We have to be a good citizen on their behalf.
 *
 * Storage is in-process, which is honest about what it is: it resets on deploy
 * and does not span instances. That is sufficient for UAT and a single PM2
 * process. When the website database lands this should move there so the quota
 * survives restarts and scales horizontally.
 */

export const VISITOR_COOKIE = "nfl_vid";
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Matches the limit the current production calculator applies. */
export const ANONYMOUS_DAILY_CALCULATIONS = 2;

type Bucket = { count: number; resetsAt: number };

const buckets = new Map<string, Bucket>();

/** Purge expired entries so the map cannot grow without bound. */
function sweep(now: number) {
  if (buckets.size < 500) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetsAt <= now) buckets.delete(key);
  }
}

function startOfNextUtcDay(now: number) {
  const date = new Date(now);
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1);
}

export type QuotaVerdict = {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetsAt: number;
};

/**
 * Consume one unit of a visitor's daily quota.
 *
 * Members are exempt: the entitlement matrix grants 无限制 for 主性格 and 五行,
 * so `limit` should be raised (or the check skipped) once auth is wired up.
 */
export function consumeCalculationQuota(
  visitorId: string,
  limit: number = ANONYMOUS_DAILY_CALCULATIONS,
): QuotaVerdict {
  const now = Date.now();
  sweep(now);

  const key = `calc:${visitorId}`;
  const existing = buckets.get(key);

  if (!existing || existing.resetsAt <= now) {
    const bucket = { count: 1, resetsAt: startOfNextUtcDay(now) };
    buckets.set(key, bucket);
    return { allowed: true, remaining: limit - 1, limit, resetsAt: bucket.resetsAt };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, limit, resetsAt: existing.resetsAt };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: limit - existing.count,
    limit,
    resetsAt: existing.resetsAt,
  };
}

/** Inspect a visitor's quota without consuming any of it. */
export function peekCalculationQuota(
  visitorId: string,
  limit: number = ANONYMOUS_DAILY_CALCULATIONS,
): QuotaVerdict {
  const now = Date.now();
  const existing = buckets.get(`calc:${visitorId}`);

  if (!existing || existing.resetsAt <= now) {
    return { allowed: true, remaining: limit, limit, resetsAt: startOfNextUtcDay(now) };
  }

  return {
    allowed: existing.count < limit,
    remaining: Math.max(0, limit - existing.count),
    limit,
    resetsAt: existing.resetsAt,
  };
}
