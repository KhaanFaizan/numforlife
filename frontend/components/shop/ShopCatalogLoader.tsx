import { Suspense } from "react";

import { ShopCatalogView } from "@/components/shop/ShopCatalogView";
import { ShopLoadingSkeleton } from "@/components/shop/ShopLoadingSkeleton";
import { getShopCatalog } from "@/lib/shop/catalog";

async function ShopCatalogSection() {
  const catalog = await getShopCatalog();
  return <ShopCatalogView catalog={catalog} />;
}

export function ShopCatalogLoader() {
  return (
    <Suspense fallback={<ShopLoadingSkeleton />}>
      <ShopCatalogSection />
    </Suspense>
  );
}
