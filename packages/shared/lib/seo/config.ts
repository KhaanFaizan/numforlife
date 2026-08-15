import { legalPages } from "@/lib/legal/registry";
import { organization, siteName, siteTagline, siteUrl } from "./site";

export const publicRoutes = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/celue", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/celue/number", changeFrequency: "weekly" as const, priority: 0.85 },
  { path: "/portfolio", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/about-us", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/contact-us", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/shop", changeFrequency: "daily" as const, priority: 0.75 },
  { path: "/shopping", changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/membership", changeFrequency: "weekly" as const, priority: 0.8 },
  ...legalPages.map((page) => ({
    path: page.path,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  })),
];

export const pageSeo = {
  home: {
    title: siteTagline,
    description:
      "数易赋能 — 透过数字生命、姓名学与东方智慧，帮助您更了解自己与他人。",
    path: "/",
  },
  about: {
    title: "关于我们",
    description: "了解数易赋能的品牌故事、价值使命与团队。",
    path: "/about-us",
  },
  contact: {
    title: "联系我们",
    description: "联系数易赋能团队，获取产品与服务支持。",
    path: "/contact-us",
  },
  portfolio: {
    title: "产品服务",
    description: "探索数易赋能的数字生命、姓名学、塔罗与东方占卜等服务。",
    path: "/portfolio",
  },
  shopping: {
    title: "商店",
    description: "数易赋能官方商店与精选产品。",
    path: "/shopping",
  },
  shop: {
    title: "官方商店",
    description: "浏览数易赋能 PlenorHub 官方商品，会员享商城优惠。",
    path: "/shop",
  },
  celue: {
    title: "测算",
    description:
      "选择数字生命等测算服务，输入基本资料即可获得简版预览。完整解读请前往数易 App。",
    path: "/celue",
  },
  membership: {
    title: "会员方案",
    description:
      "了解数易赋能基础、精英与至尊会员价格及权益。完整开通与管理请前往数易 App。",
    path: "/membership",
  },
  faq: {
    title: "常见问题",
    description: "数易赋能网站与 App 的常见问题 — 测算、会员、商店与账户说明。",
    path: "/faq",
  },
} as const;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization.name,
    url: organization.url,
    email: organization.email,
    logo: organization.logo,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: "zh-CN",
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function webPageJsonLd(input: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.title,
    description: input.description,
    url: `${siteUrl}${input.path === "/" ? "" : input.path}`,
    inLanguage: "zh-CN",
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  };
}
