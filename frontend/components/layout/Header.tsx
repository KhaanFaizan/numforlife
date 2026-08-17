"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { marketingNavLinks, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";
import { HeaderCartLink } from "@/components/layout/HeaderCartLink";

export function Header({ shopEnabled = true }: { shopEnabled?: boolean }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = shopEnabled
    ? marketingNavLinks
    : marketingNavLinks.filter((link) => link.href !== "/shop");

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <header className="site-header fixed inset-x-0 top-0 z-50">
        <div className="section-container grid h-[64px] grid-cols-[1fr_auto_1fr] items-center py-[2%] md:h-[72px]">
          <Link
            href="/"
            className="focus-accent justify-self-start font-sans text-[30px] leading-none font-semibold text-white md:text-[46px]"
          >
            {siteConfig.name}
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center justify-self-center gap-0 md:flex"
          >
            {links.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn("nav-pill", active && "text-accent")}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-self-end gap-3 md:gap-4 lg:gap-5">
            <div className="hidden items-center gap-4 md:flex lg:gap-5">
              {shopEnabled ? <HeaderCartLink /> : null}
              <Link href="/login" className="btn-login-reference whitespace-nowrap">
                Login / Sign Up
              </Link>
            </div>

            <div className="flex items-center gap-3 md:hidden">
              {shopEnabled ? <HeaderCartLink variant="mobile" /> : null}
              <button
                type="button"
                aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMobileOpen((value) => !value)}
                className="focus-accent flex h-10 w-10 items-center justify-center rounded-lg text-white"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              className="flex h-full flex-col items-center justify-center gap-5 px-6 pt-20 pb-[max(2rem,env(safe-area-inset-bottom))]"
            >
              {links.map((link, index) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "font-mono text-lg text-white transition-colors hover:text-accent",
                        active && "text-accent",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="btn-login-reference mt-4"
              >
                Login / Sign Up
              </Link>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
