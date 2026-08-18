import { ServiceDetail } from "@/components/services/ServiceDetail";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";
import { SERVICE_PAGES } from "@/lib/services";

export const metadata = metadataForPage("eastern");

export default function EasternDivinationPage() {
  return (
    <>
      <PageSeo
        page="eastern"
        breadcrumbs={[
          { name: "首页", path: "/" },
          { name: "产品服务", path: "/portfolio" },
          { name: "东方占卜术", path: "/eastern-divination" },
        ]}
      />
      <ServiceDetail content={SERVICE_PAGES.eastern} />
    </>
  );
}
