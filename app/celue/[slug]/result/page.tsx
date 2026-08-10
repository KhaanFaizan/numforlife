import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NumerologyResultView } from "@/components/calc/NumerologyResultView";
import { getCalculatorBySlug } from "@/lib/calculators/registry";
import { numerologyEngine } from "@/lib/calculators/numerology";
import { CalculationFailure } from "@/lib/calculators/types";
import type { CalculationMode, TwinStatus } from "@/lib/calculators/types";
import { VISITOR_COOKIE, consumeCalculationQuota } from "@/lib/rate-limit";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "测算结果 – 数易赋能",
  // A result is personal to whoever opened the link, so it must never be indexed.
  robots: { index: false, follow: false },
};

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const MODES: CalculationMode[] = ["normal", "day", "month", "year"];
const TWIN: TwinStatus[] = ["none", "elder", "younger"];

function Notice({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-6 md:p-8">
      <h2 className="font-sans text-lg font-semibold text-fg">{title}</h2>
      <p className="mt-3 font-sans text-sm leading-relaxed text-fg-muted">{message}</p>
      {action}
    </div>
  );
}

function ResultShell({
  slug,
  title,
  birthDate,
  children,
}: {
  slug: string;
  title: string;
  birthDate?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-bg pt-[72px] md:pt-[80px]">
      <div className="section-container py-12 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-6">
          <Link
            href={`/celue/${slug}`}
            className="focus-accent font-mono text-xs text-fg-subtle transition-colors hover:text-accent"
          >
            ← 重新测算
          </Link>
        </nav>

        <h1 className="font-sans text-3xl font-semibold text-fg md:text-4xl">{title}</h1>
        {birthDate && (
          <p className="mt-3 font-mono text-xs text-fg-subtle">出生日期：{birthDate}</p>
        )}

        <div className="mt-8 max-w-4xl">{children}</div>
      </div>
    </div>
  );
}

/**
 * Result page.
 *
 * Inputs arrive as query parameters, which makes the URL shareable (PRD 8.4) and
 * lets the page render entirely on the server. The calculation runs server-side
 * and is never exposed to the browser.
 *
 * When website record storage lands this should move to opaque record ids, so a
 * shared link stops carrying a birth date in the query string.
 */
export default async function CalculatorResultPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);
  if (!calculator || !calculator.available || slug !== "number") notFound();

  const query = await searchParams;
  const birthDate = first(query.date) ?? "";
  const modeParam = first(query.mode);
  const twinParam = first(query.twin);

  const mode: CalculationMode = MODES.includes(modeParam as CalculationMode)
    ? (modeParam as CalculationMode)
    : "normal";
  const twinStatus: TwinStatus = TWIN.includes(twinParam as TwinStatus)
    ? (twinParam as TwinStatus)
    : "none";

  // Anonymous visitors get the allowance production already applies. This also
  // shields the client's WordPress: our engine calls it server-side, so every
  // visitor reaches it from one ip and upstream's own limit cannot see them.
  const visitorId = (await cookies()).get(VISITOR_COOKIE)?.value ?? "anonymous";
  const quota = consumeCalculationQuota(visitorId);

  if (!quota.allowed) {
    return (
      <ResultShell slug={slug} title={`${calculator.name}测算结果`} birthDate={birthDate}>
        <Notice
          title="今日测算次数已用完"
          message={`未登录用户每日最多可进行 ${quota.limit} 次测算。登录数易 App 会员即可无限次测算，并保存完整测算记录。`}
          action={
            <Link
              href="https://app.numforlife.com"
              className="focus-accent mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
            >
              前往数易 App
            </Link>
          }
        />
      </ResultShell>
    );
  }

  let body: React.ReactNode;

  try {
    const outcome = await numerologyEngine.run({
      birthDate,
      mode,
      twinStatus,
      fatherBirthDate: first(query.fdate),
      motherBirthDate: first(query.mdate),
    });
    body = <NumerologyResultView result={outcome.result} />;
  } catch (error) {
    // Expected failures carry user-facing Chinese copy. Anything else is a bug,
    // so it gets a generic message rather than leaking internals to the visitor.
    const message =
      error instanceof CalculationFailure
        ? error.detail.message
        : "测算服务暂时不可用，请稍后再试。";

    body = (
      <Notice
        title="无法完成测算"
        message={message}
        action={
          <Link
            href={`/celue/${slug}`}
            className="focus-accent mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
          >
            重新测算
          </Link>
        }
      />
    );
  }

  return (
    <ResultShell slug={slug} title={`${calculator.name}测算结果`} birthDate={birthDate}>
      {body}
    </ResultShell>
  );
}
