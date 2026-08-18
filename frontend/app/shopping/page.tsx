import { ShopCatalogLoader } from "@/components/shop/ShopCatalogLoader";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";
import { getSiteFlags } from "@/lib/settings/repository";
import { redirect } from "next/navigation";

export const metadata = metadataForPage("shopping");

export const revalidate = 3600;

export default async function ShoppingPage() {
  const flags = getSiteFlags();

  if (!flags.shop_enabled) {
    redirect("/contact-us");
  }

  return (
    <>
      <PageSeo
        page="shopping"
        breadcrumbs={[
          { name: "首页", path: "/" },
          { name: "商店", path: "/shopping" },
        ]}
      />
      <ShopCatalogLoader />
    </>
  );
}
