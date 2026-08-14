import type { Metadata } from "next";
import {
  defaultDescription,
  defaultOgImage,
  locale,
  siteName,
  siteTagline,
  siteUrl,
} from "./site";

type BuildPageMetadataOptions = {
  /** Page title without the site suffix (except homepage). */
  title: string;
  description?: string;
  path: string;
  noIndex?: boolean;
  ogImage?: string;
};

/** Build consistent title, canonical, Open Graph and Twitter metadata for a public page. */
export function buildPageMetadata({
  title,
  description = defaultDescription,
  path,
  noIndex = false,
  ogImage = defaultOgImage,
}: BuildPageMetadataOptions): Metadata {
  const canonicalPath = path === "/" ? "/" : path.replace(/\/$/, "");
  const url = `${siteUrl}${canonicalPath === "/" ? "" : canonicalPath}`;
  const documentTitle =
    canonicalPath === "/" ? `${siteName} – ${title}` : `${title} – ${siteName}`;

  return {
    title: documentTitle,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale,
      url,
      siteName,
      title: documentTitle,
      description,
      images: [
        {
          url: ogImage,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: documentTitle,
      description,
      images: [ogImage],
    },
  };
}

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteName} – ${siteTagline}`,
      template: `%s – ${siteName}`,
    },
    description: defaultDescription,
    applicationName: siteName,
    openGraph: {
      type: "website",
      locale,
      siteName,
      title: siteName,
      description: defaultDescription,
      images: [{ url: defaultOgImage, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: defaultDescription,
      images: [defaultOgImage],
    },
  };
}
