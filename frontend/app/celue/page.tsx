import Link from "next/link";
import {
  CALCULATORS,
  calculatorAppUrl,
  isAppDelivery,
} from "@/lib/calculators/registry";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";

export const metadata = metadataForPage("celue");

function cardBadge(calculator: (typeof CALCULATORS)[number]) {
  if (isAppDelivery(calculator)) return "App 完整体验";
  if (calculator.slug === "tarot") return "简版筹备中";
  return "简版预览";
}

/**
 * 测算 landing page (PRD 8.2).
 */
export default function CalculationLandingPage() {
  return (
    <>
      <PageSeo
        page="celue"
        breadcrumbs={[
          { name: "首页", path: "/" },
          { name: "测算", path: "/celue" },
        ]}
      />
      <div className="page-shell">
        <div className="section-container py-12 md:py-24">
          <header className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.2em] text-accent-ink uppercase">
              Calculations
            </p>
            <h1 className="cjk section-heading mt-4">测算</h1>
            <p className="mt-5 font-sans text-base leading-relaxed text-fg-muted">
              选择一项测算，输入基本资料即可获得简版预览。完整个人化解读请前往数易 App。
            </p>
          </header>

          <ul className="mt-10 grid gap-5 sm:gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {CALCULATORS.map((calculator) => {
              const appUrl = calculatorAppUrl(calculator);
              const appOnly = isAppDelivery(calculator);

              return (
                <li key={calculator.slug}>
                  <article className="flex h-full flex-col rounded-3xl border border-border bg-surface p-6 md:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-sans text-xl font-semibold text-fg">
                        {calculator.name}
                      </h2>
                      <span className="shrink-0 rounded-full bg-accent-soft px-3 py-1 font-mono text-[10px] tracking-wide text-accent-ink uppercase">
                        {cardBadge(calculator)}
                      </span>
                    </div>

                    <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-fg-muted">
                      {calculator.shortDescription}
                    </p>

                    <p className="mt-5 font-mono text-xs text-fg-subtle">
                      约 {calculator.estimatedMinutes} 分钟
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {appOnly ? (
                        <a
                          href={appUrl}
                          className="focus-accent inline-flex rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
                        >
                          前往 App 测算
                        </a>
                      ) : (
                        <Link
                          href={`/celue/${calculator.slug}`}
                          className="focus-accent inline-flex rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
                        >
                          {calculator.slug === "tarot" ? "了解塔罗" : "开始测算"}
                        </Link>
                      )}

                      {!appOnly ? (
                        <a
                          href={appUrl}
                          className="focus-accent inline-flex rounded-full border border-border px-5 py-2.5 font-sans text-sm text-fg transition-colors hover:border-accent"
                        >
                          App 完整解读
                        </a>
                      ) : null}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
