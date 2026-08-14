import { getPublishedContent } from "@/lib/cms/server";
import { ProductServicesSection } from "@/components/sections/ProductServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";

export const metadata = metadataForPage("portfolio");

export default async function PortfolioPage() {
  const content = await getPublishedContent();

  return (
    <>
      <PageSeo
        page="portfolio"
        breadcrumbs={[
          { name: "首页", path: "/" },
          { name: "产品服务", path: "/portfolio" },
        ]}
      />
      <div className="page-shell">
        <ProductServicesSection />
        <ContactSection content={content} />
      </div>
    </>
  );
}
