import type { CalculatorDefinition } from "@/lib/calculators/types";
import { calculatorAppUrl } from "@/lib/calculators/registry";

type Props = {
  calculator: CalculatorDefinition;
};

/** Full experience lives in the App — used for 姓名学 / 东方占卜. */
export function AppCalculatorCTA({ calculator }: Props) {
  const appUrl = calculatorAppUrl(calculator);

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 md:p-8">
      <p className="font-mono text-xs tracking-[0.15em] text-accent-ink uppercase">
        App 完整体验
      </p>
      <p className="mt-4 font-sans text-sm leading-relaxed text-fg-muted">
        {calculator.name}的完整流程与记录保存在数易 App。网页版暂不提供此测算，请前往 App
        继续。
      </p>
      <a
        href={appUrl}
        className="focus-accent mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
      >
        前往 App 开始测算
      </a>
    </div>
  );
}
