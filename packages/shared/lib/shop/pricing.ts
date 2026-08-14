import type { ShopProduct, PricedProduct } from "./types";

export function applyMembershipDiscount(listPrice: number, discountPercent: number): number {
  if (listPrice <= 0 || discountPercent <= 0) return listPrice;

  const discounted = listPrice * (1 - discountPercent / 100);
  return Math.round(discounted * 100) / 100;
}

export function priceProduct(
  product: ShopProduct,
  discountPercent: number,
): PricedProduct {
  const memberPrice = applyMembershipDiscount(product.listPrice, discountPercent);
  const savings = Math.max(0, Math.round((product.listPrice - memberPrice) * 100) / 100);

  return {
    ...product,
    memberPrice,
    discountPercent,
    savings,
  };
}

export function formatCoinAmount(amount: number, currency = "KCC"): string {
  return `${amount.toFixed(2)} ${currency}`;
}
