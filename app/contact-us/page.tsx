import { ConnectIntroSection } from "@/components/sections/ConnectIntroSection";
import { ContactSection } from "@/components/sections/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "联系 – 数易赋能",
  description: "Data-driven empowerment – Contact us",
};

export default function ContactPage() {
  return (
    <div className="bg-black pt-[72px] md:pt-[80px]">
      <ConnectIntroSection />
      <ContactSection />
    </div>
  );
}
