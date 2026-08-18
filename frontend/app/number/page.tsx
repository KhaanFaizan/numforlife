import { ServiceDetail } from "@/components/services/ServiceDetail";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";
import { SERVICE_PAGES } from "@/lib/services";

export const metadata = metadataForPage("number");

export default function NumberPage() {
  return (
    <>
      <PageSeo
        page="number"
        breadcrumbs={[
          { name: "首页", path: "/" },
          { name: "产品服务", path: "/portfolio" },
          { name: "数字生命", path: "/number" },
        ]}
      />
      <ServiceDetail content={SERVICE_PAGES.number} />
    </>
  );
}
