import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NumerologyForm } from "@/components/calc/NumerologyForm";
import { getCalculatorBySlug } from "@/lib/calculators/registry";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);
  if (!calculator) return {};

  return {
    title: `${calculator.name} – 数易赋能`,
    description: calculator.shortDescription,
  };
}

/**
 * Calculator input page.
 *
 * Routed by slug against the registry, so a new calculator needs a registry
 * entry and a form component rather than a new route.
 */
export default async function CalculatorInputPage({ params }: PageProps) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  // Unknown slug, or one the client has not approved for the website yet.
  if (!calculator || !calculator.available) notFound();

  return (
    <div className="bg-bg pt-[72px] md:pt-[80px]">
      <div className="section-container py-16 md:py-24">
        <nav aria-label="Breadcrumb" className="mb-6">
          <Link
            href="/celue"
            className="focus-accent font-mono text-xs text-fg-subtle transition-colors hover:text-accent"
          >
            ← 返回测算列表
          </Link>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
          <header>
            <h1 className="font-sans text-3xl font-semibold text-fg md:text-4xl">
              {calculator.name}
            </h1>
            <p className="mt-4 font-sans text-base leading-relaxed text-fg-muted">
              {calculator.shortDescription}
            </p>
            <p className="mt-6 font-mono text-xs leading-relaxed text-fg-subtle">
              网页版测算结果为简版预览，完整解读与记录保存请使用数易 App。
            </p>
          </header>

          <div className="rounded-3xl border border-border bg-surface p-6 md:p-8">
            {slug === "number" ? (
              <NumerologyForm action={`/celue/${slug}/result`} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
