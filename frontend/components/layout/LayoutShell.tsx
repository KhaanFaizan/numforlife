"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { MaintenanceNotice } from "@/components/layout/MaintenanceNotice";
import { SiteBannerStack } from "@/components/layout/SiteBanner";
import type { SiteBanner } from "@/lib/banners/types";

export function LayoutShell({
  children,
  maintenanceMode = false,
  shopEnabled = true,
  showAppDownloadCta = true,
  banners = [],
}: {
  children: React.ReactNode;
  maintenanceMode?: boolean;
  shopEnabled?: boolean;
  showAppDownloadCta?: boolean;
  banners?: SiteBanner[];
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {maintenanceMode ? <MaintenanceNotice /> : null}
      <a
        href="#main-content"
        className="focus-accent sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-semibold focus:text-accent-fg"
      >
        Skip to content
      </a>
      <Header shopEnabled={shopEnabled} />
      <SiteBannerStack banners={banners} />
      <main id="main-content" data-show-app-cta={showAppDownloadCta ? "true" : "false"}>
        {children}
      </main>
    </>
  );
}
