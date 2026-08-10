import "server-only";

import type {
  CalculationEngine,
  CalculationOutcome,
  NumerologyInput,
  NumerologyResult,
} from "../types";

/**
 * Caching wrapper around a numerology engine.
 *
 * A shared result link is opened repeatedly — that is the point of sharing — and
 * every open would otherwise be another request to the client's production
 * WordPress. Identical inputs produce identical readings, so serving a warm copy
 * is both correct and considerate of a system we do not own.
 *
 * The cache key includes today's date for 流日/流月/流年, because those modes are
 * relative to the current date and must not be served stale across a day
 * boundary. 普通 is deterministic from the birth date alone.
 *
 * In-process and therefore per-instance; it resets on deploy. That is fine for
 * its purpose — it is an upstream-protection measure, not a source of truth.
 */

const TTL_MS = 60 * 60 * 1000;
const MAX_ENTRIES = 500;

type Entry = { outcome: CalculationOutcome<NumerologyResult>; expiresAt: number };

const cache = new Map<string, Entry>();

function keyFor(input: NumerologyInput): string {
  const parts = [
    input.birthDate,
    input.mode,
    input.twinStatus,
    input.fatherBirthDate ?? "",
    input.motherBirthDate ?? "",
  ];

  // Relative modes change meaning each day; anchor them to today.
  if (input.mode !== "normal") parts.push(new Date().toISOString().slice(0, 10));

  return parts.join("|");
}

export function withCache(
  engine: CalculationEngine<NumerologyInput, NumerologyResult>,
): CalculationEngine<NumerologyInput, NumerologyResult> {
  return {
    id: `${engine.id}+cache`,

    async run(input) {
      const key = keyFor(input);
      const now = Date.now();
      const hit = cache.get(key);

      if (hit && hit.expiresAt > now) return hit.outcome;

      const outcome = await engine.run(input);

      // Simple bound: drop the oldest insertion once full. Access patterns here
      // are shallow enough that true LRU would not earn its complexity.
      if (cache.size >= MAX_ENTRIES) {
        const oldest = cache.keys().next().value;
        if (oldest !== undefined) cache.delete(oldest);
      }

      cache.set(key, { outcome, expiresAt: now + TTL_MS });
      return outcome;
    },
  };
}
