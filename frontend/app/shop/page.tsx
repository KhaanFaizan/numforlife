import { AppDownloadCtaStrip } from "@/components/common/AppDownloadCtaStrip";
import { ShopCatalogLoader } from "@/components/shop/ShopCatalogLoader";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";
import { getSiteFlags } from "@/lib/settings/repository";
import { redirect } from "next/navigation";

export const metadata = metadataForPage("shop");

export const revalidate = 3600;

export default async function ShopPage() {
  const flags = getSiteFlags();

  if (!flags.shop_enabled) {
    redirect("/contact-us");
  }

  return (
    <>
      <PageSeo
        page="shop"
        breadcrumbs={[
          { name: "首页", path: "/" },
          { name: "商店", path: "/shop" },
        ]}
      />
      <div className="page-shell">
        <ShopCatalogLoader />

        {flags.show_app_download_cta ? (
          <AppDownloadCtaStrip description="商店结账与 KCC 余额支付请在 App 内完成。" />
        ) : null}
      </div>
    </>
  );
}
