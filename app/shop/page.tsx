import Link from "next/link";

import { ShopCatalogView } from "@/components/shop/ShopCatalogView";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";
import { getShopCatalog } from "@/lib/shop/catalog";
import { getSiteFlags } from "@/lib/settings/repository";
import { redirect } from "next/navigation";

export const metadata = metadataForPage("shop");

export const revalidate = 3600;

export default async function ShopPage() {
  if (!getSiteFlags().shop_enabled) {
    redirect("/contact-us");
  }

  const catalog = await getShopCatalog();

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
        <section className="section-container py-12 md:py-16">
          <p className="section-eyebrow cjk">Shop</p>
          <h1 className="cjk section-heading-lg mt-4">官方商店</h1>
          <p className="mt-5 max-w-3xl font-sans text-sm leading-relaxed text-fg-muted md:text-base">
            商品目录来自 PlenorHub（<code className="font-mono text-xs">shuyi</code>{" "}
            渠道）。会员商城优惠（0% / 5% / 10%）由网站按 App 后台权益规则计算展示。
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-accent-soft px-4 py-2 font-sans text-sm font-semibold text-accent-ink">
              当前视图：{catalog.tierLabel}
              {catalog.discountPercent > 0 ? ` · ${catalog.discountPercent}% 优惠` : ""}
            </span>
            <Link
              href="/membership"
              className="focus-accent inline-flex min-h-[44px] items-center rounded-full border border-border px-5 py-2.5 font-sans text-sm font-semibold text-fg transition-colors hover:border-accent"
            >
              会员方案
            </Link>
          </div>
        </section>

        <section className="section-container pb-14 md:pb-20">
          <ShopCatalogView catalog={catalog} />
        </section>
      </div>
    </>
  );
}
