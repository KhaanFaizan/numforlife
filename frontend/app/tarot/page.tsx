import { ServiceDetail } from "@/components/services/ServiceDetail";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";
import { SERVICE_PAGES } from "@/lib/services";

export const metadata = metadataForPage("tarot");

export default function TarotPage() {
  return (
    <>
      <PageSeo
        page="tarot"
        breadcrumbs={[
          { name: "首页", path: "/" },
          { name: "产品服务", path: "/portfolio" },
          { name: "塔罗占卜", path: "/tarot" },
        ]}
      />
      <ServiceDetail content={SERVICE_PAGES.tarot} />
    </>
  );
}
