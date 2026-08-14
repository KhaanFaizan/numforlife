"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard#profile", label: "账户" },
  { href: "/dashboard#membership", label: "会员" },
  { href: "/dashboard#credits", label: "能量点" },
  { href: "/dashboard#records", label: "测算记录" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Dashboard sections"
      className="sticky top-[72px] z-30 -mx-5 overflow-x-auto border-b border-border bg-bg/95 px-5 backdrop-blur-md md:top-[80px] md:mx-0 md:px-0"
    >
      <ul className="flex min-w-max gap-2 py-3 md:gap-3">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "focus-accent inline-flex min-h-[40px] items-center rounded-full px-4 py-2 font-sans text-sm transition-colors",
                pathname === "/dashboard"
                  ? "bg-surface text-fg shadow-sm"
                  : "text-fg-muted hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
