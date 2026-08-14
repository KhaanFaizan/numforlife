import { getPublishedContent } from "@/lib/cms/server";
import { AboutStorySection } from "@/components/sections/about/AboutStorySection";
import { AboutBioSection } from "@/components/sections/about/AboutBioSection";
import { AboutValuesSection } from "@/components/sections/about/AboutValuesSection";
import { AboutTeamSection } from "@/components/sections/about/AboutTeamSection";
import { AboutPartnersSection } from "@/components/sections/about/AboutPartnersSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";

export const metadata = metadataForPage("about");

export default async function AboutPage() {
  const content = await getPublishedContent();

  return (
    <>
      <PageSeo
        page="about"
        breadcrumbs={[
          { name: "首页", path: "/" },
          { name: "关于我们", path: "/about-us" },
        ]}
      />
      <div className="page-shell">
        <AboutStorySection />
        <AboutBioSection />
        <AboutValuesSection />
        <AboutTeamSection />
        <AboutPartnersSection />
        <ContactSection content={content} />
      </div>
    </>
  );
}
