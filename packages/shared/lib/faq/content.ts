import type { FaqItem, FaqPageMeta } from "./types";

export const faqPageMeta: FaqPageMeta = {
  title: "常见问题",
  description: "数易赋能网站与 App 的常见问题 — 测算、会员、商店与账户说明。",
  path: "/faq",
};

/** Placeholder FAQ content — replace with client copy when available. */
export const faqItems: FaqItem[] = [
  {
    id: "calc-web-vs-app",
    category: "测算",
    question: "网页版和 App 的测算有什么区别？",
    answer:
      "网站提供数字生命等简版预览，帮助您快速了解基本方向。完整个人化解读、记录保存与高级牌阵等功能请在数易 App 体验。",
  },
  {
    id: "calc-name-eastern",
    category: "测算",
    question: "为什么姓名学和东方占卜只能在 App 使用？",
    answer:
      "这两项测算的完整流程与历史记录保存在 App 内。网站会引导您前往 App 继续，避免网页版提供不完整体验。",
  },
  {
    id: "membership-upgrade",
    category: "会员",
    question: "如何在网站开通会员？",
    answer:
      "网站展示会员价格与权益对照，付款、续费与管理请在数易 App 完成。升级后 App 与网站账户将同步会员状态（需使用同一 KCC 账户登录）。",
  },
  {
    id: "shop-pricing",
    category: "商店",
    question: "商店价格如何计算？",
    answer:
      "商品目录来自 PlenorHub。网站按 App 后台权益规则展示会员商城优惠（基础 0%、精英 5%、至尊 10%）。结账流程以 App 或后续确认的支付方案为准。",
  },
  {
    id: "account-login",
    category: "账户",
    question: "网站登录与 App 是同一个账户吗？",
    answer:
      "是的，我们使用 KCC ID 统一身份。若您曾在 App 注册，请使用相同凭证登录网站。如遇无法登录，请联系客服协助关联账户。",
  },
  {
    id: "privacy-records",
    category: "隐私",
    question: "网页测算结果会保存吗？",
    answer:
      "网站简版预览默认不写入您的 App 测算记录。完整记录保存与导出功能在 App 内提供。详见隐私政策了解数据处理方式。",
  },
];

export function faqCategories(items: FaqItem[] = faqItems) {
  return [...new Set(items.map((item) => item.category))];
}
