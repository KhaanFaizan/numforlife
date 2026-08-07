import type { Metadata } from "next";
import { ProductServicesSection } from "@/components/sections/ProductServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Product Services – 数易赋能",
};

export default function PortfolioPage() {
  return (
    <div className="bg-black pt-[72px] md:pt-[80px]">
      <ProductServicesSection />
      <ContactSection />
    </div>
  );
}
