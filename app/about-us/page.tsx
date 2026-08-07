import type { Metadata } from "next";
import { AboutStorySection } from "@/components/sections/about/AboutStorySection";
import { AboutBioSection } from "@/components/sections/about/AboutBioSection";
import { AboutValuesSection } from "@/components/sections/about/AboutValuesSection";
import { AboutTeamSection } from "@/components/sections/about/AboutTeamSection";
import { AboutPartnersSection } from "@/components/sections/about/AboutPartnersSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "关于我们 – 数易赋能",
  description: "我们的故事与价值使命",
};

export default function AboutPage() {
  return (
    <div className="bg-black pt-[72px] md:pt-[80px]">
      <AboutStorySection />
      <AboutBioSection />
      <AboutValuesSection />
      <AboutTeamSection />
      <AboutPartnersSection />
      <ContactSection />
    </div>
  );
}
