import { ConnectIntroSection } from "@/components/sections/ConnectIntroSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";
import { getPublishedContent } from "@/lib/cms/server";

export const metadata = metadataForPage("contact");

export default async function ContactPage() {
  const content = await getPublishedContent();

  return (
    <>
      <PageSeo
        page="contact"
        breadcrumbs={[
          { name: "首页", path: "/" },
          { name: "联系我们", path: "/contact-us" },
        ]}
      />
      <div className="page-shell">
        <ConnectIntroSection />
        <ContactSection content={content} />
      </div>
    </>
  );
}
