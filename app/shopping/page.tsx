import { ContactSection } from "@/components/sections/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "商店 – 数易赋能",
  description: "Contact us",
};

export default function ShoppingPage() {
  return (
    <div className="bg-black pt-[72px] md:pt-[80px]">
      <div className="pt-8 md:pt-10 lg:pt-12">
        <ContactSection fitViewport />
      </div>
    </div>
  );
}
