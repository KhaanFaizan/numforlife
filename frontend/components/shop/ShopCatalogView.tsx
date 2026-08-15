"use client";

import { useMemo, useState } from "react";

import { shopCategoryLabel } from "@/lib/shop/categories";
import type { ShopCatalog } from "@/lib/shop/types";
import { ProductCard } from "./ProductCard";

function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-[28px] border border-border bg-surface px-6 py-10 text-center md:px-10">
      <h2 className="cjk font-sans text-xl font-semibold text-fg">{title}</h2>
      <p className="mt-3 font-sans text-sm leading-relaxed text-fg-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function ShopCatalogView({ catalog }: { catalog: ShopCatalog }) {
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return catalog.products;
    return catalog.products.filter((product) => product.category === activeCategory);
  }, [activeCategory, catalog.products]);

  if (!catalog.configured) {
    return (
      <EmptyState
        title="商店配置中"
        description='PlenorHub 渠道密钥尚未配置。请在服务器环境变量中设置 PLENORHUB_CHANNEL_KEY 后刷新页面。'
      />
    );
  }

  if (catalog.loadError) {
    return (
      <EmptyState
        title="暂时无法加载商品"
        description="PlenorHub 商品目录连接失败。请稍后再试，或先在 App 内浏览商品。"
      />
    );
  }

  if (catalog.products.length === 0) {
    return (
      <EmptyState
        title="暂无商品"
        description="当前 shuyi 渠道还没有上架商品。会员仍可查看方案与 App 内商城。"
        action={
          <a
            href="/membership"
            className="focus-accent inline-flex min-h-[44px] items-center rounded-full bg-accent px-6 py-3 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
          >
            了解会员优惠
          </a>
        }
      />
    );
  }

  return (
    <div className="space-y-8">
      {catalog.categories.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`focus-accent rounded-full px-4 py-2 font-sans text-sm transition-colors ${
              activeCategory === "all"
                ? "bg-accent text-accent-fg"
                : "border border-border bg-surface text-fg hover:border-accent"
            }`}
          >
            全部 ({catalog.products.length})
          </button>
          {catalog.categories.map((category) => {
            const count = catalog.products.filter((product) => product.category === category).length;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`focus-accent rounded-full px-4 py-2 font-sans text-sm transition-colors ${
                  activeCategory === category
                    ? "bg-accent text-accent-fg"
                    : "border border-border bg-surface text-fg hover:border-accent"
                }`}
              >
                {shopCategoryLabel(category) ?? category} ({count})
              </button>
            );
          })}
        </div>
      ) : null}

      {filteredProducts.length === 0 ? (
        <EmptyState
          title="该分类暂无商品"
          description="请选择其他分类，或稍后再来查看。"
          action={
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className="focus-accent inline-flex min-h-[44px] items-center rounded-full border border-border px-6 py-3 font-sans text-sm font-semibold text-fg transition-colors hover:border-accent"
            >
              查看全部商品
            </button>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <p className="font-mono text-[11px] text-fg-subtle">
        目录更新于 {new Date(catalog.fetchedAt).toLocaleString("zh-CN")} · 结账请在 App 完成
      </p>
    </div>
  );
}
