import { ProductServicesSection } from "@/components/sections/ProductServicesSection";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";

export const metadata = metadataForPage("portfolio");

export default function PortfolioPage() {
  return (
    <>
      <PageSeo
        page="portfolio"
        breadcrumbs={[
          { name: "首页", path: "/" },
          { name: "产品服务", path: "/portfolio" },
        ]}
      />
      <ProductServicesSection />
    </>
  );
}
