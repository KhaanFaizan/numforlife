/**
 * Shared contracts for the 测算 (calculation) subsystem.
 *
 * The website currently ships numerology (数字生命). The client is still deciding
 * whether 姓名学 and 东方占卜术 join it, so this layer is deliberately generic:
 * adding a calculator means adding a module and a registry entry, not reworking
 * routing, gating, result rendering or record storage.
 *
 * The type codes mirror `yzn_records.records_type` in the app database so website
 * records line up with app records without a translation table.
 */

/** Mirrors `yzn_records.records_type`. */
export const CALCULATOR_KINDS = {
  numerology: 0,
  name: 1,
  tarot: 2,
} as const;

export type CalculatorKind = keyof typeof CALCULATOR_KINDS;

/**
 * Calculation mode. Mirrors `yzn_records.type`:
 *   -1 正常 (normal) · 0 流年 (year) · 1 流月 (month) · 2 流日 (day)
 */
export const CALCULATION_MODES = {
  normal: -1,
  year: 0,
  month: 1,
  day: 2,
} as const;

export type CalculationMode = keyof typeof CALCULATION_MODES;

/** Twin status. Mirrors `yzn_member.twin_status` / `yzn_records.twin_status`. */
export type TwinStatus = "none" | "elder" | "younger";

export type NumerologyInput = {
  /** ISO date, YYYY-MM-DD. */
  birthDate: string;
  mode: CalculationMode;
  twinStatus: TwinStatus;
  /** Required when twinStatus is "elder". */
  fatherBirthDate?: string;
  /** Required when twinStatus is "younger". */
  motherBirthDate?: string;
};

/** One of the analysis groups (父基因, 母基因, 隐藏号, …). */
export type AnalysisGroup = {
  label: string;
  value: string;
};

/**
 * The five-element table.
 *
 * `elements` is ORDER-SENSITIVE: production rotates the element sequence per
 * birth date (木火土金水, 火土金水木, 金水木火土, 水木火土金 all observed), mapping
 * positionally onto `categories`. Storing a plain element->count map would lose
 * that, so both arrays are kept and must stay index-aligned.
 */
export type ElementTable = {
  categories: string[];
  elements: string[];
  values: number[];
};

export type NumerologyResult = {
  /** The "N号人" primary personality number. */
  personalityNumber: number;
  /** Digits of the number pyramid, in document order. */
  pyramidDigits: string[];
  /** Birth date decomposition shown beneath the pyramid (day, month, century, year). */
  dateParts: string[];
  starCount: number;
  elementTable: ElementTable | null;
  /** Analysis groups. Count varies by mode: 12 normal/day, 10 month, 6 year. */
  groups: AnalysisGroup[];
};

/** Everything a calculator returns, plus provenance for debugging and support. */
export type CalculationOutcome<TResult> = {
  result: TResult;
  /** Which implementation produced this, so support can trace a bad reading. */
  engine: string;
  computedAt: string;
};

export type CalculationError =
  | { kind: "invalid_input"; message: string; field?: string }
  | { kind: "rate_limited"; message: string }
  | { kind: "upstream_unavailable"; message: string };

export class CalculationFailure extends Error {
  constructor(readonly detail: CalculationError) {
    super(detail.message);
    this.name = "CalculationFailure";
  }
}

/**
 * A calculation engine. Swapping the numerology engine from the interim
 * WordPress-backed one to a native port means implementing this again — nothing
 * upstream of it changes.
 */
export type CalculationEngine<TInput, TResult> = {
  readonly id: string;
  run(input: TInput): Promise<CalculationOutcome<TResult>>;
};

/** Registry entry describing a calculator for listings and routing. */
export type CalculatorDefinition = {
  kind: CalculatorKind;
  /** URL segment, e.g. /celue/number */
  slug: string;
  name: string;
  shortDescription: string;
  /** Shown on the 测算 landing card (PRD 8.2). */
  estimatedMinutes: number;
  /** Whether the website exposes it yet — lets us list "coming soon" cards. */
  available: boolean;
};
