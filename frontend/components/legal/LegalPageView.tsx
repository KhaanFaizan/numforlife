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
  const [first, ...rest] = document.blocks;
  const title =
    first?.type === "heading" && first.text.length <= 80 ? first.text : meta.title;
  const bodyBlocks =
    first?.type === "heading" && first.text.length <= 80 ? rest : document.blocks;

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
      <article
        className={
          pageKey === "refund-policy" ? "legal-page is-centered" : "legal-page"
        }
      >
        <h1>{title}</h1>
        <LegalDocumentBody blocks={bodyBlocks} />
      </article>
    </>
  );
}
