import { ConnectIntroSection } from "@/components/sections/ConnectIntroSection";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";

export const metadata = metadataForPage("contact");

export default function ContactPage() {
  return (
    <>
      <PageSeo
        page="contact"
        breadcrumbs={[
          { name: "首页", path: "/" },
          { name: "联系我们", path: "/contact-us" },
        ]}
      />
      <ConnectIntroSection />
    </>
  );
}
