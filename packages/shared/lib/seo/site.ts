/** Public site URL — override per environment (UAT, production). */
export const siteUrl = (
  process.env.SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://numforlife.com"
).replace(/\/$/, "");

export const siteName = "数易赋能";

export const siteTagline = "数易赋能，您的人生导航";

export const defaultDescription =
  "数易赋能提供数字生命测算、姓名学与东方智慧指引，帮助您更了解自己与他人。网页简版预览，完整体验请下载数易 App。";

export const locale = "zh_CN";

/** Fallback OG image from the live WordPress media library until brand assets migrate. */
export const defaultOgImage =
  "https://numforlife.com/wp-content/uploads/2025/06/11062b_0a4cc6bd468f4930924daa97e9cfcce3mv2-1.avif";

export const organization = {
  name: siteName,
  url: siteUrl,
  email: "support@kccdigital.com",
  logo: defaultOgImage,
};
