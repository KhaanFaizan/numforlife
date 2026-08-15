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
import { priceProduct } from "@/lib/shop/pricing";
import type { PricedProduct, ShopCatalog } from "@/lib/shop/types";

export async function getShopCatalog(): Promise<ShopCatalog> {
  const memberPricing = await getShopMemberPricing();

  if (!isPlenorHubConfigured()) {
    return {
      products: [],
      discountPercent: memberPricing.discountPercent,
      tierLabel: memberPricing.tierLabel,
      configured: false,
      fetchedAt: new Date().toISOString(),
      categories: [],
    };
  }

  try {
    const [products, merchants] = await Promise.all([
      fetchPlenorHubProducts(),
      fetchPlenorHubMerchants(),
    ]);

    const merchantMap = new Map(merchants.map((merchant) => [merchant.id, merchant]));

    const priced = products
      .map((product) => normalizeProduct(product, merchantMap))
      .map((product) => priceProduct(product, memberPricing.discountPercent))
      .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));

    return {
      products: priced,
      discountPercent: memberPricing.discountPercent,
      tierLabel: memberPricing.tierLabel,
      configured: true,
      fetchedAt: new Date().toISOString(),
      categories: collectShopCategories(priced),
    };
  } catch (error) {
    console.error("[shop] catalog fetch failed:", error);

    return {
      products: [],
      discountPercent: memberPricing.discountPercent,
      tierLabel: memberPricing.tierLabel,
      configured: true,
      fetchedAt: new Date().toISOString(),
      categories: [],
      loadError: error instanceof Error ? error.message : "catalog_fetch_failed",
    };
  }
}

export async function getShopProduct(id: number): Promise<PricedProduct | null> {
  const memberPricing = await getShopMemberPricing();

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
