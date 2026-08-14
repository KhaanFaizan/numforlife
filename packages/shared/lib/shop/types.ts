export type ShopProduct = {
  id: number;
  name: string;
  description: string | null;
  listPrice: number;
  currency: string;
  stock: number | null;
  category: string | null;
  imageUrl: string | null;
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
};
