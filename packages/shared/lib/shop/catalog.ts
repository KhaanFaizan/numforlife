import "server-only";

import {
  fetchPlenorHubMerchants,
  fetchPlenorHubProduct,
  fetchPlenorHubProducts,
  isPlenorHubConfigured,
} from "@/lib/plenorhub/client";
import { normalizeProduct } from "@/lib/plenorhub/normalize";
import { getShopMemberPricing } from "@/lib/shop/member-discount";
import { collectShopCategories } from "@/lib/shop/categories";
import { DEMO_SHOP_PRODUCTS, getDemoShopProduct } from "@/lib/shop/demo-catalog";
import { priceProduct } from "@/lib/shop/pricing";
import type { PricedProduct, ShopCatalog } from "@/lib/shop/types";

function priceDemoProducts(discountPercent: number): PricedProduct[] {
  return DEMO_SHOP_PRODUCTS.map((product) => priceProduct(product, discountPercent));
}

function mergeCatalog(
  demoProducts: PricedProduct[],
  liveProducts: PricedProduct[],
): PricedProduct[] {
  const demoIds = new Set(demoProducts.map((product) => product.id));
  const extra = liveProducts.filter((product) => !demoIds.has(product.id));
  return [...demoProducts, ...extra];
}

export async function getShopCatalog(): Promise<ShopCatalog> {
  const memberPricing = await getShopMemberPricing();
  const demoProducts = priceDemoProducts(memberPricing.discountPercent);

  if (!isPlenorHubConfigured()) {
    return {
      products: demoProducts,
      discountPercent: memberPricing.discountPercent,
      tierLabel: memberPricing.tierLabel,
      configured: true,
      fetchedAt: new Date().toISOString(),
      categories: collectShopCategories(demoProducts),
    };
  }

  try {
    const [products, merchants] = await Promise.all([
      fetchPlenorHubProducts(),
      fetchPlenorHubMerchants(),
    ]);

    const merchantMap = new Map(merchants.map((merchant) => [merchant.id, merchant]));

    const liveProducts = products
      .map((product) => normalizeProduct(product, merchantMap))
      .map((product) => priceProduct(product, memberPricing.discountPercent));

    const merged = mergeCatalog(demoProducts, liveProducts);

    return {
      products: merged,
      discountPercent: memberPricing.discountPercent,
      tierLabel: memberPricing.tierLabel,
      configured: true,
      fetchedAt: new Date().toISOString(),
      categories: collectShopCategories(merged),
    };
  } catch (error) {
    console.error("[shop] catalog fetch failed:", error);

    return {
      products: demoProducts,
      discountPercent: memberPricing.discountPercent,
      tierLabel: memberPricing.tierLabel,
      configured: true,
      fetchedAt: new Date().toISOString(),
      categories: collectShopCategories(demoProducts),
      loadError: error instanceof Error ? error.message : "catalog_fetch_failed",
    };
  }
}

export async function getShopProduct(id: number): Promise<PricedProduct | null> {
  const memberPricing = await getShopMemberPricing();
  const demo = getDemoShopProduct(id);

  if (demo) {
    return priceProduct(demo, memberPricing.discountPercent);
  }

  if (!isPlenorHubConfigured()) return null;

  try {
    const [product, merchants] = await Promise.all([
      fetchPlenorHubProduct(id),
      fetchPlenorHubMerchants(),
    ]);

    if (!product) return null;

    const merchantMap = new Map(merchants.map((merchant) => [merchant.id, merchant]));
    return priceProduct(normalizeProduct(product, merchantMap), memberPricing.discountPercent);
  } catch (error) {
    console.error("[shop] product fetch failed:", error);
    return null;
  }
}
