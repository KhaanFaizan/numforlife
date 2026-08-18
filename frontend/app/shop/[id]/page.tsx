import { notFound } from "next/navigation";

import { ProductDetailView } from "@/components/shop/ProductDetailView";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getShopProduct } from "@/lib/shop/catalog";
import { getShopMemberPricing } from "@/lib/shop/member-discount";
import { getSiteFlags } from "@/lib/settings/repository";
import { redirect } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const product = await getShopProduct(Number(id));

  if (!product) {
    return buildPageMetadata({
      title: "商品未找到",
      description: "该商品不存在或已下架。",
      path: `/shop/${id}`,
    });
  }

  return buildPageMetadata({
    title: product.name,
    description: product.description ?? `${product.name} — 数易赋能官方商店`,
    path: `/shop/${product.id}`,
    ogImage: product.imageUrl ?? undefined,
  });
}

export const revalidate = 3600;

export default async function ShopProductPage({ params }: PageProps) {
  if (!getSiteFlags().shop_enabled) {
    redirect("/contact-us");
  }

  const { id } = await params;
  const productId = Number(id);

  if (!Number.isFinite(productId)) notFound();

  const [product, memberPricing] = await Promise.all([
    getShopProduct(productId),
    getShopMemberPricing(),
  ]);

  if (!product) notFound();

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: product.name,
            description: product.description ?? product.name,
            path: `/shop/${product.id}`,
          }),
          breadcrumbJsonLd([
            { name: "首页", path: "/" },
            { name: "商店", path: "/shopping" },
            { name: product.name, path: `/shop/${product.id}` },
          ]),
        ]}
      />
      <ProductDetailView
        product={product}
        tierLabel={memberPricing.tierLabel}
        isLoggedIn={memberPricing.isLoggedIn}
      />
    </>
  );
}
