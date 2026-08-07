import {
  ecosystemFeatures,
  footerLinks,
  galleryImages,
  siteConfig,
} from "@/lib/content";
import type { CMSContent } from "./types";

export const STORAGE_KEY = "clientdemo-cms-content";

export const defaultCMSContent: CMSContent = {
  hero: {
    tagline: siteConfig.tagline,
    titleLines: [
      "We Don't Just Guide —",
      "We Empower You to",
      "Understand Yourself and",
      "Others.",
    ],
    buttonText: siteConfig.cta,
  },
  gallery: {
    images: galleryImages.map((image, index) => ({
      id: `gallery-${index + 1}`,
      src: image.src,
      alt: image.alt,
      tall: image.tall,
    })),
  },
  features: {
    sectionLabel: "Data-driven ecosystem",
    sectionHeading:
      "More than just fortune telling, it's a guide for your life.",
    items: ecosystemFeatures.map((feature) => ({
      id: feature.id,
      title: feature.title,
      description: feature.description,
      icon: feature.icon,
    })),
  },
  footer: {
    title: "联系我们",
    email: "support@kccdigital.com",
    contactText: "Contact Pending",
    addressText: "Address Pending",
    copyright: "© 2035 by 数码麒麟",
    links: footerLinks.map((link) => ({ ...link })),
  },
  homepageBlocks: [
    { id: "block-hero", type: "hero" },
    { id: "block-gallery", type: "gallery" },
    { id: "block-brand", type: "brand" },
    { id: "block-app", type: "app-download" },
    { id: "block-about", type: "about" },
    { id: "block-features", type: "features" },
    { id: "block-results", type: "results" },
    { id: "block-partners", type: "partners" },
    { id: "block-testimonials", type: "testimonials" },
    { id: "block-footer", type: "footer" },
  ],
  pages: [
    {
      id: "page-home",
      title: "Homepage",
      slug: "/",
      status: "published",
      lastUpdated: "2026-08-07",
    },
    {
      id: "page-portfolio",
      title: "Product Services",
      slug: "/portfolio",
      status: "published",
      lastUpdated: "2026-08-07",
    },
    {
      id: "page-about",
      title: "About Us",
      slug: "/about-us",
      status: "published",
      lastUpdated: "2026-08-07",
    },
    {
      id: "page-contact",
      title: "Contact",
      slug: "/contact-us",
      status: "published",
      lastUpdated: "2026-08-07",
    },
    {
      id: "page-shop",
      title: "Shop",
      slug: "/shopping",
      status: "published",
      lastUpdated: "2026-08-07",
    },
  ],
};
