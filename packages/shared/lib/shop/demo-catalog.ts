import type { ShopProduct } from "./types";

function product(input: ShopProduct): ShopProduct {
  return input;
}

/** Demo storefront catalog — used on /shopping until PlenorHub products replace it. */
export const DEMO_SHOP_PRODUCTS: ShopProduct[] = [
  product({
    id: 841,
    name: "拓展你的人生地图",
    description: `本书名为《拓展你的人生地图》，旨在于让大家学会突破与创新自我的方法。

书名灵感源自于NLP教条里的“The Map is not Your Territory”（翻译：地图不等于实际的领域）。我认为每一个人生下来，因为环境，教育程度，所在文化的不同，产生了自身的地图。所谓的「地图」，代表的是我们对事物的认知，是由感官经验、环境所得来的，由我们给予它们意义。而「地域」则类似所谓「绝对真实的世界」，一个等待我们去突破的领域。

《拓展你的人生地图》将透过「求学篇」「思想篇」「处事篇」与「成功篇」带领大家探索与突破自己。`,
    listPrice: 19.99,
    currency: "USD",
    priceLabel: "$19.99",
    stock: null,
    category: "心灵励志书籍",
    imageUrl: "/images/product-book.webp",
    gallery: [
      "/images/product-book.webp",
      "/images/product-book-2.jpg",
      "/images/product-book-3.jpg",
      "/images/product-book-4.jpg",
      "/images/product-book-5.jpg",
    ],
    bestSeller: true,
    merchantId: null,
    merchantName: null,
    merchantLogo: null,
  }),
  product({
    id: 846,
    name: "数易赋能App + 终生至尊会员（VIP Lifetime Membership）",
    description: "数易赋能App + 终生至尊会员（VIP Lifetime Membership）",
    listPrice: 999,
    currency: "USD",
    priceLabel: "$999.00",
    stock: null,
    category: "会员订阅",
    imageUrl: "/images/product-vip.jpg",
    gallery: ["/images/product-vip.jpg"],
    merchantId: null,
    merchantName: null,
    merchantLogo: null,
  }),
  product({
    id: 2629,
    name: "短袖男女同款 T 恤",
    description: "短袖男女同款 T 恤",
    listPrice: 17,
    listPriceMax: 22,
    currency: "USD",
    priceLabel: "$17.00 – $22.00",
    stock: null,
    category: "服装",
    imageUrl: "/images/product-tee.jpg",
    gallery: ["/images/product-tee.jpg", "/images/product-tee-600.jpg"],
    colors: ["Black", "White"],
    sizes: ["S", "M", "L", "XL"],
    merchantId: null,
    merchantName: null,
    merchantLogo: null,
  }),
];

export function getDemoShopProduct(id: number): ShopProduct | null {
  return DEMO_SHOP_PRODUCTS.find((item) => item.id === id) ?? null;
}
