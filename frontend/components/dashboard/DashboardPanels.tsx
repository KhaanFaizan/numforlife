import Link from "next/link";

import type { MemberDashboardData } from "@/lib/member/types";
import {
  formatDisplayDate,
  formatDateTime,
  membershipExpiryLabel,
} from "@/lib/member/format";

function Panel({
  id,
  title,
  description,
  children,
  action,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-36 rounded-[28px] border border-border bg-surface p-6 md:p-8"
    >
      <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="cjk font-sans text-xl font-semibold text-fg md:text-2xl">{title}</h2>
          {description ? (
            <p className="mt-2 font-sans text-sm leading-relaxed text-fg-muted">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      <div className="pt-6">{children}</div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <dt className="font-sans text-sm text-fg-muted">{label}</dt>
      <dd className="font-sans text-sm font-semibold text-fg">{value}</dd>
    </div>
  );
}

export function DashboardPanels({ data }: { data: MemberDashboardData }) {
  const { profile, membership, records, coinLog } = data;

  return (
    <div className="grid gap-8 xl:grid-cols-2">
      <Panel
        id="profile"
        title="账户资料"
        description="来自 App 会员档案的只读视图。如需修改资料，请前往数易 App。"
      >
        <dl>
          <InfoRow label="昵称" value={profile.nickname ?? "—"} />
          <InfoRow label="邮箱" value={profile.email ?? "—"} />
          <InfoRow label="手机" value={profile.mobile ?? "—"} />
          <InfoRow label="出生日期" value={profile.birthDate ?? "—"} />
        </dl>
      </Panel>

      <Panel
        id="membership"
        title="会员状态"
        description="会员等级与商城优惠读取自 App 后台配置。"
        action={
          <Link
            href="/membership"
            className="focus-accent inline-flex min-h-[44px] items-center rounded-full border border-border px-5 py-2.5 font-sans text-sm font-semibold text-fg transition-colors hover:border-accent"
          >
            查看会员方案
          </Link>
        }
      >
        <dl>
          <InfoRow label="当前等级" value={membership.levelName} />
          <InfoRow label="有效期" value={membershipExpiryLabel(membership)} />
          <InfoRow
            label="商城优惠"
            value={
              membership.shopDiscountPercent === null
                ? "—"
                : `${membership.shopDiscountPercent}%`
            }
          />
          {membership.subscriptionStart ? (
            <InfoRow
              label="开通时间"
              value={formatDisplayDate(membership.subscriptionStart)}
            />
          ) : null}
        </dl>

        {(membership.levelId ?? 1) < 3 ? (
          <Link
            href="https://app.numforlife.com/h5/"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-accent mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-accent px-6 py-3 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover sm:w-auto"
          >
            在 App 升级会员
          </Link>
        ) : null}
      </Panel>

      <div className="xl:col-span-2">
        <Panel
          id="credits"
          title="能量点 / KCC Coin"
          description="余额来自 App 账户。完整流水与兑换规则请在 App 内查看。"
        >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-border bg-bg-subtle p-5">
            <p className="font-sans text-sm text-fg-muted">KCC Coin 余额</p>
            <p className="mt-2 font-sans text-4xl font-bold text-fg">{profile.coins}</p>
          </div>
          <div className="rounded-3xl border border-border bg-bg-subtle p-5">
            <p className="font-sans text-sm text-fg-muted">积分</p>
            <p className="mt-2 font-sans text-4xl font-bold text-fg">{profile.points}</p>
          </div>
        </div>

        {coinLog.length > 0 ? (
          <ul className="mt-6 space-y-3">
            {coinLog.map((entry) => (
              <li
                key={entry.id}
                className="flex flex-col gap-1 rounded-2xl border border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-sans text-sm font-semibold text-fg">{entry.label}</p>
                  <p className="font-mono text-xs text-fg-subtle">
                    {formatDateTime(entry.createdAt)}
                  </p>
                </div>
                <p
                  className={`font-sans text-sm font-semibold ${
                    entry.amount >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {entry.amount >= 0 ? "+" : ""}
                  {entry.amount}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-bg-subtle px-6 py-10 text-center">
            <p className="font-sans text-sm text-fg-muted">暂无最近能量点流水。</p>
            <Link
              href="https://app.numforlife.com/h5/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-accent mt-4 inline-flex min-h-[44px] items-center rounded-full bg-accent px-6 py-3 font-sans text-sm font-semibold text-accent-fg"
            >
              在 App 查看完整流水
            </Link>
          </div>
        )}
        </Panel>
      </div>

      <div className="xl:col-span-2">
        <Panel
          id="records"
          title="最近测算记录"
          description="网站仅展示摘要。完整解读与全部历史记录请使用数易 App。"
          action={
          <Link
            href="/celue"
            className="focus-accent inline-flex min-h-[44px] items-center rounded-full border border-border px-5 py-2.5 font-sans text-sm font-semibold text-fg transition-colors hover:border-accent"
          >
            新建测算
          </Link>
        }
      >
        {records.length > 0 ? (
          <ul className="divide-y divide-border">
            {records.map((record) => (
              <li
                key={record.id}
                className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-sans text-sm font-semibold text-fg">{record.label}</p>
                  <p className="font-mono text-xs text-fg-subtle">
                    {[record.birthDate, formatDateTime(record.createdAt)]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                {record.recordsType === 0 && record.birthDate ? (
                  <Link
                    href={`/celue/number/result?date=${record.birthDate}&mode=normal&twin=none`}
                    className="focus-accent inline-flex min-h-[40px] items-center rounded-full bg-bg px-4 py-2 font-sans text-xs font-semibold text-fg transition-colors hover:bg-accent-soft"
                  >
                    查看网页预览
                  </Link>
                ) : (
                  <span className="font-sans text-xs text-fg-subtle">App 内查看</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-bg-subtle px-6 py-10 text-center">
            <p className="font-sans text-sm text-fg-muted">
              暂无测算记录。先在网页体验简版数字生命，或在 App 保存完整记录。
            </p>
            <Link
              href="/celue/number"
              className="focus-accent mt-4 inline-flex min-h-[44px] items-center rounded-full bg-accent px-6 py-3 font-sans text-sm font-semibold text-accent-fg"
            >
              开始数字生命测算
            </Link>
          </div>
        )}
        </Panel>
      </div>
    </div>
  );
}
