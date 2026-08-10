"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="focus-accent sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-semibold focus:text-accent-fg"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
    </>
  );
}
