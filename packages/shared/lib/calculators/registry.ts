import type { CalculatorDefinition } from "./types";
import { numerologyCalculator } from "./numerology";

/**
 * Every calculator the website knows about.
 *
 * Scope is unsettled — numerology is confirmed, while 姓名学 and 东方占卜术 are
 * under discussion — so unavailable entries are listed here rather than omitted.
 * The 测算 landing renders them as "coming soon" cards, which satisfies PRD 8.2
 * ("list all available website-level calculations") and means enabling one later
 * is a flag flip plus an engine, not new plumbing.
 */
export const CALCULATORS: CalculatorDefinition[] = [
  numerologyCalculator,
  {
    kind: "name",
    slug: "name",
    name: "姓名学",
    shortDescription: "从姓名笔画与部首解析性格特质与人生课题。",
    estimatedMinutes: 2,
    available: false,
  },
];

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return CALCULATORS.find((calculator) => calculator.slug === slug);
}

export function getAvailableCalculators(): CalculatorDefinition[] {
  return CALCULATORS.filter((calculator) => calculator.available);
}
