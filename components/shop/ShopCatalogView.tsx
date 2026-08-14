import Link from "next/link";

import type { ShopCatalog } from "@/lib/shop/types";
import { ProductCard } from "./ProductCard";

export function ShopCatalogView({ catalog }: { catalog: ShopCatalog }) {
  if (!catalog.configured) {
    return (
      <div className="rounded-[28px] border border-border bg-surface px-6 py-10 text-center md:px-10">
        <h2 className="cjk font-sans text-xl font-semibold text-fg">商店配置中</h2>
        <p className="mt-3 font-sans text-sm leading-relaxed text-fg-muted">
          PlenorHub 渠道密钥尚未配置。请在服务器环境变量中设置{" "}
          <code className="rounded bg-bg-subtle px-1.5 py-0.5 font-mono text-xs">PLENORHUB_CHANNEL_KEY</code>{" "}
          后刷新页面。
        </p>
      </div>
    );
  }

  if (catalog.products.length === 0) {
    return (
      <div className="rounded-[28px] border border-border bg-surface px-6 py-10 text-center md:px-10">
        <h2 className="cjk font-sans text-xl font-semibold text-fg">暂无商品</h2>
        <p className="mt-3 font-sans text-sm leading-relaxed text-fg-muted">
          当前 PlenorHub 渠道还没有上架商品，或暂时无法连接商品目录。请稍后再试。
        </p>
        <Link
          href="/membership"
          className="focus-accent mt-6 inline-flex min-h-[44px] items-center rounded-full bg-accent px-6 py-3 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
        >
          了解会员优惠
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {catalog.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
