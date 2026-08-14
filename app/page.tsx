import type { Metadata } from "next";
import { HomePageRenderer } from "@/components/home/HomePageRenderer";
import { PageSeo } from "@/components/seo/PageSeo";
import { getPublishedContent } from "@/lib/cms/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { pageSeo } from "@/lib/seo/config";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedContent();
  const description =
    content.hero.titleLines.filter(Boolean).join(" ").slice(0, 160) ||
    pageSeo.home.description;

  return buildPageMetadata({
    title: pageSeo.home.title,
    description,
    path: pageSeo.home.path,
  });
}

export default async function HomePage() {
  const content = await getPublishedContent();

  return (
    <>
      <PageSeo page="home" />
      <HomePageRenderer content={content} />
    </>
  );
}
