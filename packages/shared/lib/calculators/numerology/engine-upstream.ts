import "server-only";

import { CALCULATION_MODES } from "../types";
import type {
  CalculationEngine,
  CalculationOutcome,
  NumerologyInput,
  NumerologyResult,
} from "../types";
import { CalculationFailure } from "../types";
import { parseNumerologyHtml } from "./parse";

/**
 * INTERIM numerology engine.
 *
 * Why this exists
 * ---------------
 * The numerology algorithm exists only as a PHP snippet inside WordPress; the
 * client has confirmed there is no calculation API. Rather than guess the
 * formulas, this engine calls the authoritative implementation and parses its
 * output, so readings on the new website are correct from day one.
 *
 * Guessing was considered and rejected on evidence: across the captured
 * fixtures, "personality number = digital root of the birth date" holds for 7 of
 * 9 non-twin cases but fails 2000-01-01 (predicts 4, production returns 9). One
 * counterexample in a small sample means unknown special-casing, and a wrong
 * reading is a trust failure in this product category, not a cosmetic bug.
 *
 * Replacing it
 * ------------
 * When the PHP snippet is supplied, implement `CalculationEngine` natively and
 * swap the export in `./index.ts`. The regression suite already asserts the
 * captured production fixtures, so the port is verifiable before it ships.
 *
 * This module is server-only: the upstream URL and the calculation itself must
 * never be exposed to the browser (PRD 9 — calculation logic stays server-side).
 */

const UPSTREAM_URL =
  process.env.NUMEROLOGY_UPSTREAM_URL ??
  "https://numforlife.com/member-number-simulate/";

const TIMEOUT_MS = 12_000;

/** Maps our typed input onto the form fields the upstream page expects. */
function toFormBody(input: NumerologyInput): URLSearchParams {
  const body = new URLSearchParams();
  body.set("date", input.birthDate);
  body.set("twin", input.twinStatus === "none" ? "n" : "y");

  if (input.twinStatus === "elder") {
    body.set("big", "big");
    if (input.fatherBirthDate) body.set("f-date", input.fatherBirthDate);
  } else if (input.twinStatus === "younger") {
    body.set("big", "small");
    if (input.motherBirthDate) body.set("m-date", input.motherBirthDate);
  }

  // Mode is expressed by WHICH submit button is sent, not by a value.
  switch (input.mode) {
    case "day":
      body.set("type_day", "1");
      break;
    case "month":
      body.set("type_month", "1");
      break;
    case "year":
      body.set("type_year", "1");
      break;
    default:
      body.set("countbtn", "1");
  }

  return body;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function validateNumerologyInput(input: NumerologyInput): void {
  if (!ISO_DATE.test(input.birthDate)) {
    throw new CalculationFailure({
      kind: "invalid_input",
      field: "birthDate",
      message: "请选择有效的出生日期。",
    });
  }

  // A date the browser accepts can still be nonsense (2026-02-31), so verify it
  // round-trips rather than trusting the pattern alone.
  const parsed = new Date(`${input.birthDate}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || !parsed.toISOString().startsWith(input.birthDate)) {
    throw new CalculationFailure({
      kind: "invalid_input",
      field: "birthDate",
      message: "请选择有效的出生日期。",
    });
  }

  if (input.twinStatus === "elder" && !input.fatherBirthDate) {
    throw new CalculationFailure({
      kind: "invalid_input",
      field: "fatherBirthDate",
      message: "双胞胎（大）需要填写父亲出生日期。",
    });
  }

  if (input.twinStatus === "younger" && !input.motherBirthDate) {
    throw new CalculationFailure({
      kind: "invalid_input",
      field: "motherBirthDate",
      message: "双胞胎（小）需要填写母亲出生日期。",
    });
  }

  if (!(input.mode in CALCULATION_MODES)) {
    throw new CalculationFailure({
      kind: "invalid_input",
      field: "mode",
      message: "无效的测算类型。",
    });
  }
}

export const upstreamNumerologyEngine: CalculationEngine<
  NumerologyInput,
  NumerologyResult
> = {
  id: "numerology-upstream-wordpress",

  async run(input): Promise<CalculationOutcome<NumerologyResult>> {
    validateNumerologyInput(input);

    let html: string;
    try {
      const response = await fetch(UPSTREAM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: toFormBody(input).toString(),
        signal: AbortSignal.timeout(TIMEOUT_MS),
        // Every input combination is a distinct calculation; caching would serve
        // one visitor another visitor's reading.
        cache: "no-store",
      });

      if (!response.ok) {
        throw new CalculationFailure({
          kind: "upstream_unavailable",
          message: "测算服务暂时不可用，请稍后再试。",
        });
      }

      html = await response.text();
    } catch (error) {
      if (error instanceof CalculationFailure) throw error;
      throw new CalculationFailure({
        kind: "upstream_unavailable",
        message: "测算服务暂时不可用，请稍后再试。",
      });
    }

    const result = parseNumerologyHtml(html);
    if (!result) {
      throw new CalculationFailure({
        kind: "upstream_unavailable",
        message: "未能取得测算结果，请稍后再试。",
      });
    }

    return {
      result,
      engine: upstreamNumerologyEngine.id,
      computedAt: new Date().toISOString(),
    };
  },
};
