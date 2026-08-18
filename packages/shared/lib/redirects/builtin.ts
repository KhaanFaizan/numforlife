import type { RedirectManifest } from "./types";

/** Built-in WordPress migration map — used when the manifest file is unavailable. */
export const BUILTIN_REDIRECT_MANIFEST: RedirectManifest = {
  exact: {
    "/member-number-simulate": "/celue/number",
    "/my-account": "/dashboard",
    "/cart": "/shopping",
    "/checkout": "/shopping",
    "/view-order": "/dashboard",
    "/%e4%bd%bf%e7%94%a8%e6%9d%a1%e6%ac%be": "/terms-of-use",
    "/使用条款": "/terms-of-use",
  },
  prefix: [
    { prefix: "/product", destination: "/shopping" },
    { prefix: "/product-category", destination: "/shopping" },
  ],
  updatedAt: "builtin",
};

/** @deprecated Use BUILTIN_REDIRECT_MANIFEST.exact — kept for reference in seed data. */
export const LEGACY_REDIRECTS = BUILTIN_REDIRECT_MANIFEST.exact;
