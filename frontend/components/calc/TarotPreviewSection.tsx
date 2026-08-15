import { calculatorAppUrl, getCalculatorBySlug } from "@/lib/calculators/registry";

/** Tarot scaffold until deck/spread content is supplied by the client. */
export function TarotPreviewSection() {
  const calculator = getCalculatorBySlug("tarot");
  const appUrl = calculator ? calculatorAppUrl(calculator) : "https://app.numforlife.com/h5/";

  return (
    <div className="space-y-6">
      <p className="font-sans text-sm leading-relaxed text-fg-muted">
        塔罗网页简版正在完善中。您可先了解牌阵说明，或前往 App 体验完整抽牌与解读流程。
      </p>

      <div className="rounded-2xl border border-dashed border-border bg-bg-subtle p-5">
        <p className="font-mono text-xs text-fg-subtle">网页简版</p>
        <p className="mt-2 font-sans text-sm text-fg-muted">
          完整塔罗引擎与牌义内容待客户提供后将接入此页面。
        </p>
      </div>

      <a
        href={appUrl}
        className="focus-accent inline-flex rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
      >
        在 App 中体验塔罗
      </a>
    </div>
  );
}
