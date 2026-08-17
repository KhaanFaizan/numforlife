"use client";

import { usePathname } from "next/navigation";
import { ContactSection } from "@/components/sections/ContactSection";
import { useLiveCMS } from "@/lib/cms/content-provider";

const PAGES_WITH_CONTACT_FOOTER = new Set([
  "/",
  "/about-us",
  "/contact-us",
  "/portfolio",
]);

const FOOTER_EXCLUDED_PREFIXES = ["/dashboard", "/login", "/celue", "/admin"];

export function GlobalSiteFooter() {
  const pathname = usePathname();
  const { content } = useLiveCMS();

  if (FOOTER_EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  if (PAGES_WITH_CONTACT_FOOTER.has(pathname)) {
    return null;
  }

  return <ContactSection content={content} />;
}
