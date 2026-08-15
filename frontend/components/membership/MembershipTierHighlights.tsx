import type { MembershipCatalog } from "@/lib/membership/types";

const SHOP_DISCOUNT_BY_KEY = {
  base: 0,
  elite: 5,
  supreme: 10,
} as const;

export function MembershipTierHighlights({ catalog }: { catalog: MembershipCatalog }) {
  const tiers =
    catalog.tiers.length > 0
      ? catalog.tiers
      : [
          { key: "base" as const, name: "基础会员" },
          { key: "elite" as const, name: "精英会员" },
          { key: "supreme" as const, name: "至尊会员" },
        ];

  return (
    <section className="section-container pb-8 md:pb-10">
      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((tier) => (
          <article
            key={tier.key}
            className="rounded-[24px] border border-border bg-surface p-5 md:p-6"
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-accent-ink uppercase">
              {tier.key === "base" ? "Basic" : tier.key === "elite" ? "Elite" : "Supreme"}
            </p>
            <h2 className="cjk mt-2 font-sans text-xl font-semibold text-fg">{tier.name}</h2>
            <ul className="mt-4 space-y-2 font-sans text-sm text-fg-muted">
              <li>商城优惠：{SHOP_DISCOUNT_BY_KEY[tier.key]}%</li>
              <li>{tier.key === "base" ? "网页测算：每日有限额度" : "网页测算：更高 / 无限制预览"}</li>
              <li>开通与管理：数易 App</li>
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-4 font-mono text-[11px] text-fg-subtle">
        权益细则以 App 后台 `getVipPurview` 实时配置为准，网站不做硬编码。
      </p>
    </section>
  );
}
