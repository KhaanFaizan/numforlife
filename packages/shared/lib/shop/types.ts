export type ShopProduct = {
  id: number;
  name: string;
  description: string | null;
  listPrice: number;
  /** Upper bound when the product has a price range (e.g. apparel options). */
  listPriceMax?: number;
  currency: string;
  /** Storefront label such as "$19.99" or "$17.00 – $22.00". */
  priceLabel?: string;
  stock: number | null;
  category: string | null;
  imageUrl: string | null;
  gallery?: string[];
  colors?: string[];
  sizes?: string[];
  bestSeller?: boolean;
  merchantId: number | null;
  merchantName: string | null;
  merchantLogo: string | null;
};

export type PricedProduct = ShopProduct & {
  memberPrice: number;
  discountPercent: number;
  savings: number;
};

export type ShopCatalog = {
  products: PricedProduct[];
  discountPercent: number;
  tierLabel: string;
  configured: boolean;
  fetchedAt: string;
  categories: string[];
  loadError?: string | null;
};
