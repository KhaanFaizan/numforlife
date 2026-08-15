import Link from "next/link";

import { formatGiftCoins, formatUsd } from "@/lib/membership/format";
import type { MembershipCatalog, MembershipTier } from "@/lib/membership/types";
import { cn } from "@/lib/utils";

function recommendedPlan(tier: MembershipTier) {
  return tier.plans.find((plan) => plan.recommended) ?? tier.plans.find((plan) => plan.fee > 0);
}

function visiblePlans(tier: MembershipTier) {
  return tier.plans.filter((plan) => plan.fee > 0 || tier.key === "base");
}

export function MembershipPricingSection({ catalog }: { catalog: MembershipCatalog }) {
  if (catalog.tiers.length === 0) {
    return (
      <section className="section-container py-10">
        <p className="rounded-3xl border border-border bg-surface px-6 py-8 text-center font-sans text-sm text-fg-muted">
          会员价格暂时无法加载。权益对照表仍来自 App 后台配置，请稍后再试或通过 App 查看完整方案。
        </p>
      </section>
    );
  }

  return (
    <section className="section-container py-10 md:py-14">
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {catalog.tiers.map((tier) => {
          const highlight = recommendedPlan(tier);
          const isPaid = tier.key !== "base";

          return (
            <article
              key={tier.id}
              className={cn(
                "flex h-full flex-col rounded-[28px] border bg-surface p-6 md:p-8",
                highlight?.recommended
                  ? "border-accent shadow-[0_20px_60px_rgba(255,193,7,0.12)]"
                  : "border-border",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.18em] text-accent-ink uppercase">
                    {tier.key === "base" ? "Basic" : tier.key === "elite" ? "Elite" : "Supreme"}
                  </p>
                  <h2 className="cjk mt-2 font-sans text-2xl font-semibold text-fg">{tier.name}</h2>
                </div>
                {highlight?.recommended ? (
                  <span className="rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-semibold tracking-wide text-accent-fg uppercase">
                    推荐
                  </span>
                ) : null}
              </div>

              {highlight ? (
                <div className="mt-6">
                  <p className="font-sans text-4xl font-bold text-fg">{formatUsd(highlight.fee)}</p>
                  <p className="mt-1 font-sans text-sm text-fg-muted">{highlight.label}</p>
                  {formatGiftCoins(highlight.giftCoins) ? (
                    <p className="mt-2 font-mono text-xs text-accent-ink">
                      {formatGiftCoins(highlight.giftCoins)}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <ul className="mt-6 space-y-3 border-t border-border pt-6">
                {visiblePlans(tier).map((plan) => (
                  <li
                    key={plan.period}
                    className="flex items-start justify-between gap-4 font-sans text-sm"
                  >
                    <span className="text-fg-muted">{plan.label}</span>
                    <span className="text-right font-semibold text-fg">
                      {formatUsd(plan.fee)}
                      {formatGiftCoins(plan.giftCoins) ? (
                        <span className="mt-1 block font-mono text-[11px] font-normal text-accent-ink">
                          {formatGiftCoins(plan.giftCoins)}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                {isPaid ? (
                  <Link
                    href="https://app.numforlife.com/h5/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-accent inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-accent px-6 py-3 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
                  >
                    在 App 开通
                  </Link>
                ) : (
                  <Link
                    href="https://app.numforlife.com/h5/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-accent inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-border px-6 py-3 font-sans text-sm font-semibold text-fg transition-colors hover:border-accent"
                  >
                    免费注册
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function MembershipBenefitsSection({ catalog }: { catalog: MembershipCatalog }) {
  return (
    <section className="section-container pb-14 md:pb-20">
      <div className="overflow-hidden rounded-[28px] border border-border bg-surface">
        <div className="border-b border-border px-5 py-6 md:px-8">
          <h2 className="cjk section-heading">会员权益对照</h2>
          <p className="mt-3 max-w-3xl font-sans text-sm leading-relaxed text-fg-muted">
            权益规则来自 App 后台配置，网站仅展示，不在此修改等级或到期时间。
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-bg-subtle">
                <th scope="col" className="px-5 py-4 font-sans text-sm font-semibold text-fg md:px-8">
                  权限
                </th>
                {catalog.tiers.length > 0
                  ? catalog.tiers.map((tier) => (
                      <th
                        key={tier.id}
                        scope="col"
                        className="px-4 py-4 font-sans text-sm font-semibold text-fg"
                      >
                        {tier.name}
                      </th>
                    ))
                  : ["基础会员", "精英会员", "至尊会员"].map((name) => (
                      <th key={name} scope="col" className="px-4 py-4 font-sans text-sm font-semibold text-fg">
                        {name}
                      </th>
                    ))}
              </tr>
            </thead>
            <tbody>
              {catalog.entitlements.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-border last:border-b-0 ${
                    row.id === 17 ? "bg-accent-soft/40" : ""
                  }`}
                >
                  <th scope="row" className="px-5 py-4 align-top font-sans text-sm font-semibold text-fg md:px-8">
                    <div>{row.name}</div>
                    {row.notes ? (
                      <div className="mt-1 font-mono text-[11px] font-normal text-fg-subtle">{row.notes}</div>
                    ) : null}
                  </th>
                  <td className="px-4 py-4 font-sans text-sm text-fg-muted">{row.base.label}</td>
                  <td className="px-4 py-4 font-sans text-sm text-fg-muted">{row.elite.label}</td>
                  <td className="px-4 py-4 font-sans text-sm text-fg-muted">{row.supreme.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function MembershipAppCta() {
  return (
    <section className="border-t border-border bg-bg-subtle">
      <div className="section-container flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center md:py-16">
        <div className="max-w-2xl">
          <h2 className="cjk font-sans text-2xl font-semibold text-fg md:text-3xl">
            开通与管理会员，请使用数易 App
          </h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-fg-muted md:text-base">
            网站展示会员方案与权益说明。付款、续费、到期时间与完整测算记录均在 App 内完成。
          </p>
        </div>
        <Link
          href="https://app.numforlife.com/h5/"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-accent inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-accent px-8 py-3 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
        >
          打开数易 App
        </Link>
      </div>
    </section>
  );
}
