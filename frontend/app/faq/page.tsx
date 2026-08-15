import { FaqPageView } from "@/components/faq/FaqPageView";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { faqPageMeta } from "@/lib/faq/content";

export const metadata = buildPageMetadata({
  title: faqPageMeta.title,
  description: faqPageMeta.description,
  path: faqPageMeta.path,
});

export default function FaqPage() {
  return <FaqPageView />;
}
