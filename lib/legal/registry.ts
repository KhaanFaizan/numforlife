import accessibilityStatement from "./content/accessibility_statement.json";
import privacyPolicy from "./content/privacy_policy.json";
import refundPolicy from "./content/refund_policy.json";
import shippingPolicy from "./content/shipping_policy.json";
import termsOfUse from "./content/terms_of_use.json";
import type { LegalDocument, LegalPageKey, LegalPageMeta } from "./types";

const documents: Record<LegalPageKey, LegalDocument> = {
  "privacy-policy": privacyPolicy as LegalDocument,
  "refund-policy": refundPolicy as LegalDocument,
  "shipping-policy": shippingPolicy as LegalDocument,
  "accessibility-statement": accessibilityStatement as LegalDocument,
  "terms-of-use": termsOfUse as LegalDocument,
};

export const legalPages: LegalPageMeta[] = [
  {
    key: "privacy-policy",
    title: "隐私政策",
    description: "数易赋能隐私政策 — 我们如何收集、使用与保护您的个人信息。",
    path: "/privacy-policy",
  },
  {
    key: "refund-policy",
    title: "退款政策",
    description: "数易赋能退款政策 — 会员与数字商品的退款规则说明。",
    path: "/refund-policy",
  },
  {
    key: "shipping-policy",
    title: "配送政策",
    description: "数易赋能配送政策 — 实体商品配送与交付说明。",
    path: "/shipping-policy",
  },
  {
    key: "accessibility-statement",
    title: "无障碍声明",
    description: "数易赋能无障碍声明 — 我们对网站与应用无障碍使用的承诺。",
    path: "/accessibility-statement",
  },
  {
    key: "terms-of-use",
    title: "使用条款",
    description: "数易赋能使用条款 — 使用网站与 App 服务的规则与约定。",
    path: "/terms-of-use",
  },
];

export function getLegalDocument(key: LegalPageKey): LegalDocument {
  return documents[key];
}

export function getLegalPageMeta(key: LegalPageKey): LegalPageMeta {
  const meta = legalPages.find((page) => page.key === key);
  if (!meta) throw new Error(`Unknown legal page: ${key}`);
  return meta;
}
