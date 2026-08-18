"use client";

import { usePathname } from "next/navigation";
import { ContactSection } from "@/components/sections/ContactSection";
import { useLiveCMS } from "@/lib/cms/content-provider";

const FOOTER_EXCLUDED_PREFIXES = ["/dashboard", "/celue", "/admin"];
const PAGES_WITH_INLINE_FOOTER = new Set(["/"]);

export function GlobalSiteFooter() {
  const pathname = usePathname();
  const { content } = useLiveCMS();

  if (FOOTER_EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  if (PAGES_WITH_INLINE_FOOTER.has(pathname)) {
    return null;
  }

  return <ContactSection content={content} />;
}
