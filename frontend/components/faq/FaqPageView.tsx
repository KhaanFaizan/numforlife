"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { faqCategories, faqItems, faqPageMeta } from "@/lib/faq/content";
import type { FaqItem } from "@/lib/faq/types";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/config";
import { cn } from "@/lib/utils";

function FaqAccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-surface">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="focus-accent flex w-full items-start justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
      >
        <span className="font-sans text-sm font-semibold text-fg md:text-base">
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            "mt-0.5 h-5 w-5 shrink-0 text-fg-subtle transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <div className="border-t border-border px-5 pb-5 md:px-6 md:pb-6">
          <p className="pt-4 font-sans text-sm leading-relaxed text-fg-muted">{item.answer}</p>
        </div>
      ) : null}
    </div>
  );
}

export function FaqPageView() {
  const categories = faqCategories();

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: faqPageMeta.title,
            description: faqPageMeta.description,
            path: faqPageMeta.path,
          }),
          breadcrumbJsonLd([
            { name: "首页", path: "/" },
            { name: faqPageMeta.title, path: faqPageMeta.path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]}
      />
      <div className="page-shell">
        <article className="section-container py-12 md:py-16">
          <p className="section-eyebrow cjk">FAQ</p>
          <h1 className="cjk section-heading-lg mt-4">{faqPageMeta.title}</h1>
          <p className="mt-5 max-w-3xl font-sans text-sm leading-relaxed text-fg-muted md:text-base">
            以下内容为网站常见问题的说明。正式政策与最新规则请以 App 内说明及法律页面为准。
          </p>

          <div className="mt-10 space-y-10">
            {categories.map((category) => (
              <section key={category}>
                <h2 className="cjk font-sans text-xl font-semibold text-fg">{category}</h2>
                <div className="mt-4 space-y-3">
                  {faqItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <FaqAccordionItem key={item.id} item={item} />
                    ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
            <Link
              href="/contact-us"
              className="focus-accent inline-flex min-h-[44px] items-center justify-center rounded-full border border-border px-6 py-3 font-sans text-sm font-semibold text-fg transition-colors hover:border-accent"
            >
              仍有问题？联系我们
            </Link>
            <Link
              href="/privacy-policy"
              className="focus-accent inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent px-6 py-3 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
            >
              查看隐私政策
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
