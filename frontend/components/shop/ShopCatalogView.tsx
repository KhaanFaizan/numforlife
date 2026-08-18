"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { shopCategoryLabel } from "@/lib/shop/categories";
import type { PricedProduct, ShopCatalog } from "@/lib/shop/types";
import { ProductCard } from "./ProductCard";

type ShopSort = "recommended" | "latest" | "price" | "price-desc";
type FilterAcc = "price" | "color" | "size" | null;

const CATEGORY_DESCRIPTION =
  "This is your category description. It's a great place to tell customers what the products in this category are.";
const CATEGORY_DESCRIPTION_MORE =
  " Browse the book, lifetime membership, and apparel from the original store demo. Checkout stays in the App.";

function lowPrice(product: PricedProduct) {
  return product.discountPercent > 0 ? product.memberPrice : product.listPrice;
}

function highPrice(product: PricedProduct) {
  return product.listPriceMax ?? lowPrice(product);
}

function inPriceRange(product: PricedProduct, min: number, max: number) {
  return highPrice(product) >= min && lowPrice(product) <= max;
}

function sortProducts(products: PricedProduct[], sort: ShopSort) {
  const next = [...products];

  if (sort === "price") {
    next.sort((a, b) => lowPrice(a) - lowPrice(b));
  } else if (sort === "price-desc") {
    next.sort((a, b) => highPrice(b) - highPrice(a));
  } else if (sort === "latest") {
    next.sort((a, b) => b.id - a.id);
  }

  return next;
}

function uniqueValues(products: PricedProduct[], key: "colors" | "sizes") {
  const values = new Set<string>();
  for (const product of products) {
    for (const value of product[key] ?? []) {
      values.add(value);
    }
  }
  return [...values];
}

function toggleValue(current: string[], value: string) {
  return current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];
}

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
    <div className="shop-empty">
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </div>
  );
}

export function ShopCatalogView({ catalog }: { catalog: ShopCatalog }) {
  const [sort, setSort] = useState<ShopSort>("recommended");
  const [category, setCategory] = useState<string | "all">("all");
  const [openFilter, setOpenFilter] = useState<FilterAcc>("price");
  const [descOpen, setDescOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const colors = useMemo(() => uniqueValues(catalog.products, "colors"), [catalog.products]);
  const sizes = useMemo(() => uniqueValues(catalog.products, "sizes"), [catalog.products]);

  const priceBounds = useMemo(() => {
    if (catalog.products.length === 0) return { min: 0, max: 0 };
    return {
      min: Math.floor(Math.min(...catalog.products.map(lowPrice))),
      max: Math.ceil(Math.max(...catalog.products.map(highPrice))),
    };
  }, [catalog.products]);

  const [priceMin, setPriceMin] = useState(priceBounds.min);
  const [priceMax, setPriceMax] = useState(priceBounds.max);

  const products = useMemo(() => {
    const filtered = catalog.products.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (!inPriceRange(product, priceMin, priceMax)) return false;
      if (
        selectedColors.length > 0 &&
        !(product.colors ?? []).some((color) => selectedColors.includes(color))
      ) {
        return false;
      }
      if (
        selectedSizes.length > 0 &&
        !(product.sizes ?? []).some((size) => selectedSizes.includes(size))
      ) {
        return false;
      }
      return true;
    });

    return sortProducts(filtered, sort);
  }, [catalog.products, category, priceMin, priceMax, selectedColors, selectedSizes, sort]);

  const bannerImage =
    catalog.products.find((product) => product.imageUrl)?.imageUrl ??
    "/images/product-book.webp";

  if (!catalog.configured) {
    return (
      <EmptyState
        title="商店配置中"
        description="PlenorHub 渠道密钥尚未配置。请在服务器环境变量中设置 PLENORHUB_CHANNEL_KEY 后刷新页面。"
      />
    );
  }

  if (catalog.products.length === 0) {
    return (
      <EmptyState
        title="暂无商品"
        description="当前渠道还没有上架商品。会员仍可查看方案与 App 内商城。"
        action={<Link href="/membership">了解会员优惠</Link>}
      />
    );
  }

  function toggleFilter(id: FilterAcc) {
    setOpenFilter((current) => (current === id ? null : id));
  }

  function onMinChange(value: number) {
    setPriceMin(Math.min(value, priceMax));
  }

  function onMaxChange(value: number) {
    setPriceMax(Math.max(value, priceMin));
  }

  function resetFilters() {
    setCategory("all");
    setPriceMin(priceBounds.min);
    setPriceMax(priceBounds.max);
    setSelectedColors([]);
    setSelectedSizes([]);
  }

  return (
    <div className="shop-page">
      <div className="shop-layout">
        <aside className="shop-sidebar">
          <nav className="shop-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span> &gt; </span>
            <span>All Products</span>
          </nav>

          <div className="shop-browse">
            <h2>Browse by</h2>
            <ul>
              <li>
                <button
                  type="button"
                  className={category === "all" ? "is-active" : undefined}
                  onClick={() => setCategory("all")}
                >
                  All Products
                </button>
              </li>
              {catalog.categories.map((slug) => (
                <li key={slug}>
                  <button
                    type="button"
                    className={category === slug ? "is-active" : undefined}
                    onClick={() => setCategory(slug)}
                  >
                    {shopCategoryLabel(slug) ?? slug}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="shop-filters">
            <h2>Filter by</h2>

            <div className="shop-filter">
              <button
                type="button"
                className="shop-filter-toggle"
                aria-expanded={openFilter === "price"}
                onClick={() => toggleFilter("price")}
              >
                <span>Price</span>
                <span aria-hidden>{openFilter === "price" ? "−" : "+"}</span>
              </button>
              {openFilter === "price" ? (
                <div className="shop-price">
                  <div className="shop-price-slider">
                    <div className="shop-price-track" />
                    <input
                      type="range"
                      min={priceBounds.min}
                      max={priceBounds.max}
                      value={priceMin}
                      aria-label="Minimum price"
                      onChange={(event) => onMinChange(Number(event.target.value))}
                    />
                    <input
                      type="range"
                      min={priceBounds.min}
                      max={priceBounds.max}
                      value={priceMax}
                      aria-label="Maximum price"
                      onChange={(event) => onMaxChange(Number(event.target.value))}
                    />
                  </div>
                  <div className="shop-price-labels">
                    <span>${priceMin}</span>
                    <span>${priceMax}</span>
                  </div>
                </div>
              ) : null}
            </div>

            {colors.length > 0 ? (
              <div className="shop-filter">
                <button
                  type="button"
                  className="shop-filter-toggle"
                  aria-expanded={openFilter === "color"}
                  onClick={() => toggleFilter("color")}
                >
                  <span>Color</span>
                  <span aria-hidden>{openFilter === "color" ? "−" : "+"}</span>
                </button>
                {openFilter === "color" ? (
                  <div className="shop-filter-options">
                    {colors.map((color) => (
                      <label key={color} className="shop-filter-option">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={() => setSelectedColors((current) => toggleValue(current, color))}
                        />
                        {color}
                      </label>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            {sizes.length > 0 ? (
              <div className="shop-filter">
                <button
                  type="button"
                  className="shop-filter-toggle"
                  aria-expanded={openFilter === "size"}
                  onClick={() => toggleFilter("size")}
                >
                  <span>Size</span>
                  <span aria-hidden>{openFilter === "size" ? "−" : "+"}</span>
                </button>
                {openFilter === "size" ? (
                  <div className="shop-filter-options">
                    {sizes.map((size) => (
                      <label key={size} className="shop-filter-option">
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(size)}
                          onChange={() => setSelectedSizes((current) => toggleValue(current, size))}
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </aside>

        <div className="shop-main">
          <div className="shop-banner">
            <img src={bannerImage} alt="" />
          </div>

          <h1 className="shop-heading">
            {category === "all" ? "All Products" : (shopCategoryLabel(category) ?? category)}
          </h1>
          <p className="shop-desc">
            {CATEGORY_DESCRIPTION}
            {descOpen ? ` ${CATEGORY_DESCRIPTION_MORE}` : "… "}
            <button type="button" onClick={() => setDescOpen((open) => !open)}>
              {descOpen ? "Read less" : "Read more"}
            </button>
          </p>

          <div className="shop-meta">
            <span>
              {products.length} product{products.length === 1 ? "" : "s"}
            </span>
            <label className="shop-sort">
              <span>Sort by:</span>
              <select
                value={sort}
                aria-label="Sort products"
                onChange={(event) => setSort(event.target.value as ShopSort)}
              >
                <option value="recommended">Recommended</option>
                <option value="latest">Latest</option>
                <option value="price">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
          </div>

          {products.length === 0 ? (
            <EmptyState
              title="没有符合条件的商品"
              description="请调整分类、价格、颜色或尺码后再试。"
              action={
                <button type="button" onClick={resetFilters}>
                  查看全部商品
                </button>
              }
            />
          ) : (
            <div className="shop-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  bestSeller={Boolean(product.bestSeller)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
