import Link from "next/link";

import { LegalDocumentBody } from "@/components/legal/LegalDocumentBody";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getLegalDocument, getLegalPageMeta } from "@/lib/legal/registry";
import type { LegalPageKey } from "@/lib/legal/types";

type LegalPageProps = {
  pageKey: LegalPageKey;
};

export function legalMetadata(pageKey: LegalPageKey) {
  const meta = getLegalPageMeta(pageKey);
  return buildPageMetadata({
    title: meta.title,
    description: meta.description,
    path: meta.path,
  });
}

export function LegalPageView({ pageKey }: LegalPageProps) {
  const meta = getLegalPageMeta(pageKey);
  const document = getLegalDocument(pageKey);

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: meta.title,
            description: meta.description,
            path: meta.path,
          }),
          breadcrumbJsonLd([
            { name: "首页", path: "/" },
            { name: meta.title, path: meta.path },
          ]),
        ]}
      />
      <div className="page-shell">
        <article className="section-container py-12 md:py-16">
          <p className="section-eyebrow">Legal</p>
          <h1 className="cjk section-heading-lg mt-4">{meta.title}</h1>
          <p className="mt-4 max-w-3xl font-mono text-[11px] text-fg-subtle">
            内容迁移自 numforlife.com（{document.capturedAt}）。正式版本以 App 与后台最新政策为准。
          </p>

          <div className="mt-10 max-w-4xl">
            <LegalDocumentBody blocks={document.blocks} />
          </div>

          <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
            <Link
              href="/contact-us"
              className="focus-accent inline-flex min-h-[44px] items-center justify-center rounded-full border border-border px-6 py-3 font-sans text-sm font-semibold text-fg transition-colors hover:border-accent"
            >
              联系我们
            </Link>
            <Link
              href="/"
              className="focus-accent inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent px-6 py-3 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
            >
              返回首页
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
