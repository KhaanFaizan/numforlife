export type LegalBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type LegalDocument = {
  title: string;
  path: string;
  wpSlug: string;
  capturedAt: string;
  blocks: LegalBlock[];
};

export type LegalPageKey =
  | "privacy-policy"
  | "refund-policy"
  | "shipping-policy"
  | "accessibility-statement"
  | "terms-of-use";

export type LegalPageMeta = {
  key: LegalPageKey;
  title: string;
  description: string;
  path: string;
};
