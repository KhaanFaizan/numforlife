import { ShopCatalogLoader } from "@/components/shop/ShopCatalogLoader";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";
import { getSiteFlags } from "@/lib/settings/repository";
import { redirect } from "next/navigation";

export const metadata = metadataForPage("shop");

export const revalidate = 3600;

/** Alias of /shopping — kept so cached /shopping → /shop redirects still show the catalog. */
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
          { name: "商店", path: "/shopping" },
        ]}
      />
      <ShopCatalogLoader />
    </>
  );
}
