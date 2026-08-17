import { FaqPageView } from "@/components/faq/FaqPageView";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";

export const metadata = metadataForPage("faq");

export default function FaqPage() {
  return (
    <>
      <PageSeo
        page="faq"
        breadcrumbs={[
          { name: "首页", path: "/" },
          { name: "常见问题", path: "/faq" },
        ]}
      />
      <FaqPageView />
    </>
  );
}
