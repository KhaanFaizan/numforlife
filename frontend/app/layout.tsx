import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Work_Sans, Azeret_Mono, Roboto } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContentProvider } from "@/lib/cms/content-provider";
import { getPublishedContent } from "@/lib/cms/server";
import { listActiveSiteBanners } from "@/lib/banners/repository";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { getSiteFlags } from "@/lib/settings/repository";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/config";
import { rootMetadata } from "@/lib/seo/metadata";
import { THEME_COOKIE } from "@/lib/theme";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const azeretMono = Azeret_Mono({
  variable: "--font-azeret-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto-face",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = rootMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Light theme is Demo's invert overlay (`darkmode--activated`), not a
  // separate token palette. Stamp the class from the cookie to avoid a flash.
  const themePreference = (await cookies()).get(THEME_COOKIE)?.value;
  const lightMode = themePreference === "light";
  const publishedContent = await getPublishedContent();
  const siteFlags = getSiteFlags();
  const activeBanners = listActiveSiteBanners();
  const fontClass = `${workSans.variable} ${azeretMono.variable} ${roboto.variable}`;

  return (
    <html
      lang="zh-CN"
      data-scroll-behavior="smooth"
      className={`${fontClass}${lightMode ? " darkmode--activated" : ""}`}
      suppressHydrationWarning
    >
      <body
        className={`min-h-screen bg-bg text-fg antialiased${lightMode ? " darkmode--activated" : ""}`}
        suppressHydrationWarning
      >
        <div className="darkmode-background" aria-hidden />
        <div className="darkmode-layer" aria-hidden />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <ContentProvider initialPublished={publishedContent}>
          <LayoutShell
            maintenanceMode={siteFlags.maintenance_mode}
            shopEnabled={siteFlags.shop_enabled}
            showAppDownloadCta={siteFlags.show_app_download_cta}
            banners={activeBanners}
          >
            {children}
          </LayoutShell>
        </ContentProvider>
      </body>
    </html>
  );
}
