import { AboutStorySection } from "@/components/sections/about/AboutStorySection";
import { AboutBioSection } from "@/components/sections/about/AboutBioSection";
import { AboutValuesSection } from "@/components/sections/about/AboutValuesSection";
import { AboutTeamSection } from "@/components/sections/about/AboutTeamSection";
import { AboutPartnersSection } from "@/components/sections/about/AboutPartnersSection";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";

export const metadata = metadataForPage("about");

export default function AboutPage() {
  return (
    <>
      <PageSeo
        page="about"
        breadcrumbs={[
          { name: "首页", path: "/" },
          { name: "关于我们", path: "/about-us" },
        ]}
      />
      <AboutStorySection />
      <AboutBioSection />
      <AboutValuesSection />
      <AboutTeamSection />
      <AboutPartnersSection />
    </>
  );
}
