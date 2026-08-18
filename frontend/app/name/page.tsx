import { ServiceDetail } from "@/components/services/ServiceDetail";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";
import { SERVICE_PAGES } from "@/lib/services";

export const metadata = metadataForPage("name");

export default function NamePage() {
  return (
    <>
      <PageSeo
        page="name"
        breadcrumbs={[
          { name: "首页", path: "/" },
          { name: "产品服务", path: "/portfolio" },
          { name: "姓名学", path: "/name" },
        ]}
      />
      <ServiceDetail content={SERVICE_PAGES.name} />
    </>
  );
}
