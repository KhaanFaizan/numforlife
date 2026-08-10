import { ConnectIntroSection } from "@/components/sections/ConnectIntroSection";
import { ContactSection } from "@/components/sections/ContactSection";
import type { Metadata } from "next";
import { getPublishedContent } from "@/lib/cms/server";

export const metadata: Metadata = {
  title: "联系 – 数易赋能",
  description: "Data-driven empowerment – Contact us",
};

export default async function ContactPage() {
  const content = await getPublishedContent();

  return (
    <div className="bg-bg pt-[72px] md:pt-[80px]">
      <ConnectIntroSection />
      <ContactSection content={content} />
    </div>
  );
}
