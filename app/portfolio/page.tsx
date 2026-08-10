import type { Metadata } from "next";
import { getPublishedContent } from "@/lib/cms/server";
import { ProductServicesSection } from "@/components/sections/ProductServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Product Services – 数易赋能",
};

export default async function PortfolioPage() {
  const content = await getPublishedContent();

  return (
    <div className="bg-bg pt-[72px] md:pt-[80px]">
      <ProductServicesSection />
      <ContactSection content={content} />
    </div>
  );
}
