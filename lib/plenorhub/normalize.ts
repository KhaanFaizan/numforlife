import type { PlenorHubMerchantRaw, PlenorHubProductRaw } from "./types";
import type { ShopProduct } from "@/lib/shop/types";

const ASSET_BASE =
  process.env.PLENORHUB_SERVER_URL?.replace(/\/$/, "") ?? "https://api.plenorhub.com";

function parsePrice(value: unknown): number {
  if (value === null || value === undefined || value === "") return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function resolveAssetUrl(value: string | null | undefined): string | null {
  if (!value?.trim()) return null;
  const trimmed = value.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `${ASSET_BASE}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;
}

function pickImage(product: PlenorHubProductRaw): string | null {
  const fromArray =
    Array.isArray(product.images) && product.images.length > 0
      ? resolveAssetUrl(
          typeof product.images[0] === "string"
            ? product.images[0]
            : product.images[0]?.url,
        )
      : null;

  return (
    resolveAssetUrl(product.image_url) ??
    resolveAssetUrl(product.image) ??
    resolveAssetUrl(product.thumbnail) ??
    resolveAssetUrl(product.cover_image) ??
    fromArray
  );
}

export function normalizeProduct(
  product: PlenorHubProductRaw,
  merchants: Map<number, PlenorHubMerchantRaw>,
): ShopProduct {
  const merchantFromMap =
    product.merchant_id !== undefined && product.merchant_id !== null
      ? merchants.get(product.merchant_id)
      : undefined;

  const merchant = product.merchant ?? undefined;

  return {
    id: product.id,
    name: (product.name ?? product.title ?? `Product ${product.id}`).trim(),
    description: product.description?.trim() || product.short_description?.trim() || null,
    listPrice: parsePrice(product.price),
    currency: (product.currency ?? "KCC").trim() || "KCC",
    stock:
      product.in_stock === false
        ? 0
        : product.stock ?? product.quantity ?? null,
    category: product.category?.trim() || null,
    imageUrl: pickImage(product),
    merchantId: product.merchant_id ?? merchant?.id ?? null,
    merchantName: merchant?.name?.trim() || merchantFromMap?.name?.trim() || null,
    merchantLogo:
      resolveAssetUrl(merchant?.logo_url) ??
      resolveAssetUrl(merchant?.logo) ??
      resolveAssetUrl(merchantFromMap?.logo_url) ??
      resolveAssetUrl(merchantFromMap?.logo) ??
      null,
  };
}
