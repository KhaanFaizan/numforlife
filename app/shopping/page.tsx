import { ContactSection } from "@/components/sections/ContactSection";
import type { Metadata } from "next";
import { getPublishedContent } from "@/lib/cms/server";

export const metadata: Metadata = {
  title: "商店 – 数易赋能",
  description: "Contact us",
};

export default async function ShoppingPage() {
  const content = await getPublishedContent();

  return (
    <div className="bg-bg pt-[72px] md:pt-[80px]">
      <div className="pt-8 md:pt-10 lg:pt-12">
        <ContactSection content={content} fitViewport />
      </div>
    </div>
  );
}
