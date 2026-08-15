import type { RedirectManifest } from "./types";

/** Built-in WordPress migration map — used when the manifest file is unavailable. */
export const BUILTIN_REDIRECT_MANIFEST: RedirectManifest = {
  exact: {
    "/member-number-simulate": "/celue/number",
    "/number": "/celue/number",
    "/name": "/celue/name",
    "/tarot": "/celue/tarot",
    "/eastern-divination": "/celue/eastern",
    "/my-account": "/dashboard",
    "/sign-up": "/login",
    "/shopping": "/shop",
    "/cart": "/shop",
    "/checkout": "/shop",
    "/view-order": "/dashboard",
    "/%e4%bd%bf%e7%94%a8%e6%9d%a1%e6%ac%be": "/terms-of-use",
    "/使用条款": "/terms-of-use",
  },
  prefix: [
    { prefix: "/product", destination: "/shop" },
    { prefix: "/product-category", destination: "/shop" },
  ],
  updatedAt: "builtin",
};

/** @deprecated Use BUILTIN_REDIRECT_MANIFEST.exact — kept for reference in seed data. */
export const LEGACY_REDIRECTS = BUILTIN_REDIRECT_MANIFEST.exact;
