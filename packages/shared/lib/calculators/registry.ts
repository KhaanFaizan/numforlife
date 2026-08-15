import type { CalculatorDefinition } from "./types";
import { DEFAULT_APP_EXPERIENCE_URL } from "./constants";
import { numerologyCalculator } from "./numerology";

/**
 * Every calculator the website lists on /celue (PRD 8.2).
 *
 * Soon (2026-08-14):
 *   • numerology + tarot — website (tarot scaffold until deck content arrives)
 *   • 姓名学 + 东方占卜 — App deep links
 */
export const CALCULATORS: CalculatorDefinition[] = [
  numerologyCalculator,
  {
    kind: "tarot",
    slug: "tarot",
    name: "塔罗",
    shortDescription: "透过塔罗牌阵探索当下课题与指引方向。网页简版即将完善，完整牌阵请前往 App。",
    estimatedMinutes: 3,
    available: true,
    delivery: "website",
  },
  {
    kind: "name",
    slug: "name",
    name: "姓名学",
    shortDescription: "从姓名笔画与部首解析性格特质与人生课题。",
    estimatedMinutes: 2,
    available: true,
    delivery: "app",
    externalAppUrl: DEFAULT_APP_EXPERIENCE_URL,
  },
  {
    kind: "eastern",
    slug: "eastern",
    name: "东方占卜",
    shortDescription: "小六壬、奇门遁甲等东方术数指引，完整流程请在 App 体验。",
    estimatedMinutes: 3,
    available: true,
    delivery: "app",
    externalAppUrl: DEFAULT_APP_EXPERIENCE_URL,
  },
];

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return CALCULATORS.find((calculator) => calculator.slug === slug);
}

export function getAvailableCalculators(): CalculatorDefinition[] {
  return CALCULATORS.filter((calculator) => calculator.available);
}

export function calculatorAppUrl(calculator: CalculatorDefinition): string {
  return calculator.externalAppUrl?.trim() || DEFAULT_APP_EXPERIENCE_URL;
}

export function isAppDelivery(calculator: CalculatorDefinition): boolean {
  return calculator.delivery === "app";
}
