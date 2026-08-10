import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NumerologyResultView } from "@/components/calc/NumerologyResultView";
import { getCalculatorBySlug } from "@/lib/calculators/registry";
import { numerologyEngine } from "@/lib/calculators/numerology";
import { CalculationFailure } from "@/lib/calculators/types";
import type { CalculationMode, TwinStatus } from "@/lib/calculators/types";

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

function ErrorPanel({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-6 md:p-8">
      <h2 className="font-sans text-lg font-semibold text-fg">无法完成测算</h2>
      <p className="mt-3 font-sans text-sm leading-relaxed text-fg-muted">{message}</p>
      <Link
        href="/celue/number"
        className="focus-accent mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
      >
        重新测算
      </Link>
    </div>
  );
}

/**
 * Result page.
 *
 * Inputs arrive as query parameters, which makes the URL shareable (PRD 8.4) and
 * lets the page render entirely on the server. The calculation itself runs
 * server-side and is never exposed to the browser.
 *
 * When website record storage lands, this should move to opaque record ids so a
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
    body =
      error instanceof CalculationFailure ? (
        <ErrorPanel message={error.detail.message} />
      ) : (
        <ErrorPanel message="测算服务暂时不可用，请稍后再试。" />
      );
  }

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

        <h1 className="font-sans text-3xl font-semibold text-fg md:text-4xl">
          {calculator.name}测算结果
        </h1>
        {birthDate && (
          <p className="mt-3 font-mono text-xs text-fg-subtle">出生日期：{birthDate}</p>
        )}

        <div className="mt-8 max-w-4xl">{body}</div>
      </div>
    </div>
  );
}
