import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Work_Sans, Azeret_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContentProvider } from "@/lib/cms/content-provider";
import { getPublishedContent } from "@/lib/cms/server";
import { listActiveSiteBanners } from "@/lib/banners/repository";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { getSiteFlags } from "@/lib/settings/repository";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/config";
import { rootMetadata } from "@/lib/seo/metadata";
import { THEME_COOKIE, resolveTheme } from "@/lib/theme";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const azeretMono = Azeret_Mono({
  variable: "--font-azeret-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = rootMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read the stored preference on the server so the correct palette ships in
  // the first byte of HTML. `data-theme` is omitted for "system", letting the
  // prefers-color-scheme media query decide — no flash either way.
  const themePreference = (await cookies()).get(THEME_COOKIE)?.value;
  const theme = resolveTheme(themePreference);
  const publishedContent = await getPublishedContent();
  const siteFlags = getSiteFlags();
  const activeBanners = listActiveSiteBanners();

  return (
    <html
      lang="zh-CN"
      data-theme={theme ?? undefined}
      data-scroll-behavior="smooth"
      className={`${workSans.variable} ${azeretMono.variable}`}
    >
      <body className="min-h-screen bg-bg font-sans text-fg antialiased">
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
