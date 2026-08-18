import Link from "next/link";

import type { MemberDashboardData } from "@/lib/member/types";

export function DashboardStatCards({ data }: { data: MemberDashboardData }) {
  const cards = [
    {
      label: "KCC Coin",
      value: String(data.profile.coins),
      hint: "可用于 App 商城",
    },
    {
      label: "会员等级",
      value: data.membership.levelName,
      hint:
        data.membership.shopDiscountPercent !== null
          ? `商城 ${data.membership.shopDiscountPercent}% 优惠`
          : "权益读取自 App",
    },
    {
      label: "测算记录",
      value: String(data.records.length),
      hint: data.records.length > 0 ? "最近摘要" : "暂无记录",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-[24px] border border-border bg-surface p-5 md:p-6"
        >
          <p className="font-sans text-sm text-fg-muted">{card.label}</p>
          <p className="mt-2 font-sans text-3xl font-bold text-fg">{card.value}</p>
          <p className="mt-2 font-mono text-[11px] text-fg-subtle">{card.hint}</p>
        </article>
      ))}
    </div>
  );
}

export function DashboardQuickActions() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Link
              href="/celue/number?calc=1"
        className="focus-accent rounded-2xl border border-border bg-surface px-4 py-4 font-sans text-sm font-semibold text-fg transition-colors hover:border-accent"
      >
        数字生命测算
      </Link>
      <Link
        href="/shopping"
        className="focus-accent rounded-2xl border border-border bg-surface px-4 py-4 font-sans text-sm font-semibold text-fg transition-colors hover:border-accent"
      >
        浏览商店
      </Link>
      <Link
        href="/membership"
        className="focus-accent rounded-2xl border border-border bg-surface px-4 py-4 font-sans text-sm font-semibold text-fg transition-colors hover:border-accent"
      >
        会员方案
      </Link>
      <Link
        href="https://app.numforlife.com/h5/"
        target="_blank"
        rel="noopener noreferrer"
        className="focus-accent rounded-2xl border border-accent/30 bg-accent-soft px-4 py-4 font-sans text-sm font-semibold text-accent-ink transition-colors hover:border-accent"
      >
        打开数易 App
      </Link>
    </div>
  );
}
