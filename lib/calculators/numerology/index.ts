import type { CalculatorDefinition } from "../types";
import { upstreamNumerologyEngine } from "./engine-upstream";
import { withCache } from "./engine-cached";

export const numerologyCalculator: CalculatorDefinition = {
  kind: "numerology",
  slug: "number",
  name: "数字生命",
  shortDescription: "透过出生日期解读你的数字密码、五行分布与主性格。",
  estimatedMinutes: 2,
  available: true,
};

/**
 * The active numerology engine.
 *
 * Swapping the interim upstream engine for a native port is a one-line change
 * here; nothing that consumes it needs to know which implementation is running.
 * The cache wrapper stays useful either way, though it matters most now, while
 * every calculation is a round trip to the client's production WordPress.
 */
export const numerologyEngine = withCache(upstreamNumerologyEngine);

export { validateNumerologyInput } from "./engine-upstream";
export { parseNumerologyHtml } from "./parse";
