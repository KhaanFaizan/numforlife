import "server-only";

const LOGIN_ATTEMPTS = 5;
const WINDOW_MS = 60_000;

type Bucket = { count: number; resetsAt: number };

const buckets = new Map<string, Bucket>();

function sweep(now: number) {
  if (buckets.size < 200) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetsAt <= now) buckets.delete(key);
  }
}

/** Best-effort IP extraction for login throttling (5/min per IP). */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function consumeLoginAttempt(ip: string) {
  const now = Date.now();
  sweep(now);

  const key = `login:${ip}`;
  const existing = buckets.get(key);

  if (!existing || existing.resetsAt <= now) {
    buckets.set(key, { count: 1, resetsAt: now + WINDOW_MS });
    return { allowed: true, remaining: LOGIN_ATTEMPTS - 1 };
  }

  if (existing.count >= LOGIN_ATTEMPTS) {
    return { allowed: false, remaining: 0, retryAfterMs: existing.resetsAt - now };
  }

  existing.count += 1;
  return { allowed: true, remaining: LOGIN_ATTEMPTS - existing.count };
}
