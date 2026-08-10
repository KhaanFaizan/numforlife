"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <motion.header
        initial={reducedMotion ? false : { y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-panel border-b border-border shadow-[0_8px_32px_var(--shadow-color,rgba(0,0,0,0.12))]"
            : "bg-bg/80 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center px-6 md:h-[72px] md:px-10 lg:px-16">
          <Link
            href="/"
            className="focus-accent shrink-0 rounded-lg font-sans text-xl font-bold text-fg md:text-2xl lg:text-[28px]"
          >
            {siteConfig.name}
          </Link>

          <nav
            aria-label="Main navigation"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex lg:gap-12"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-accent rounded-md font-sans text-sm font-normal text-fg transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <motion.a
              href="/admin/login"
              whileHover={reducedMotion ? undefined : { scale: 1.03 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              className="focus-accent inline-flex rounded-full border border-accent/80 px-5 py-2 font-sans text-sm text-fg transition-colors hover:bg-accent/10"
            >
              Login / Sign Up
            </motion.a>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((v) => !v)}
            className="focus-accent ml-auto flex h-10 w-10 items-center justify-center rounded-lg text-fg md:hidden"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="flex h-full flex-col items-center justify-center gap-8 pt-16"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="focus-accent rounded-lg font-sans text-2xl text-fg"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/admin/login"
                onClick={() => setMobileOpen(false)}
                className="focus-accent mt-4 rounded-full border border-accent px-8 py-3 font-sans text-sm text-fg"
              >
                Login / Sign Up
              </Link>
              <ThemeToggle className="mt-2" />
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
