import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppCalculatorCTA } from "@/components/calc/AppCalculatorCTA";
import { NumerologyForm } from "@/components/calc/NumerologyForm";
import { TarotPreviewSection } from "@/components/calc/TarotPreviewSection";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getCalculatorBySlug,
  isAppDelivery,
} from "@/lib/calculators/registry";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/config";
import { buildPageMetadata } from "@/lib/seo/metadata";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);
  if (!calculator) return {};

  return buildPageMetadata({
    title: calculator.name,
    description: calculator.shortDescription,
    path: `/celue/${slug}`,
  });
}

export default async function CalculatorInputPage({ params }: PageProps) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator || !calculator.available) notFound();

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: calculator.name,
            description: calculator.shortDescription,
            path: `/celue/${slug}`,
          }),
          breadcrumbJsonLd([
            { name: "首页", path: "/" },
            { name: "测算", path: "/celue" },
            { name: calculator.name, path: `/celue/${slug}` },
          ]),
        ]}
      />
      <div className="page-shell">
        <div className="section-container py-12 md:py-24">
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
              <h1 className="cjk section-heading">{calculator.name}</h1>
              <p className="mt-4 font-sans text-base leading-relaxed text-fg-muted">
                {calculator.shortDescription}
              </p>
              <p className="mt-6 font-mono text-xs leading-relaxed text-fg-subtle">
                {isAppDelivery(calculator)
                  ? "此测算的完整流程请在数易 App 体验。"
                  : "网页版测算结果为简版预览，完整解读与记录保存请使用数易 App。"}
              </p>
            </header>

            <div className="rounded-3xl border border-border bg-surface p-6 md:p-8">
              {isAppDelivery(calculator) ? (
                <AppCalculatorCTA calculator={calculator} />
              ) : slug === "number" ? (
                <NumerologyForm action={`/celue/${slug}/result`} />
              ) : slug === "tarot" ? (
                <TarotPreviewSection />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
