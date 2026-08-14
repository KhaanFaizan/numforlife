import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageSeo, webPageJsonLd } from "@/lib/seo/config";
import { buildPageMetadata } from "@/lib/seo/metadata";

type PageKey = keyof typeof pageSeo;

type PageSeoProps = {
  page: PageKey;
  breadcrumbs?: Array<{ name: string; path: string }>;
};

/** Shared JSON-LD bundle for a public marketing page. */
export function PageSeo({ page, breadcrumbs }: PageSeoProps) {
  const seo = pageSeo[page];
  const scripts: Array<Record<string, unknown>> = [
    webPageJsonLd({
      title: seo.title,
      description: seo.description,
      path: seo.path,
    }),
  ];

  if (breadcrumbs?.length) {
    scripts.push(breadcrumbJsonLd(breadcrumbs));
  }

  return <JsonLd data={scripts} />;
}

export function metadataForPage(page: PageKey) {
  const seo = pageSeo[page];
  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: seo.path,
  });
}
