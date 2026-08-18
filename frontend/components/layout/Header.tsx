"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { marketingNavLinks, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";
import { HeaderCartLink } from "@/components/layout/HeaderCartLink";

export function Header({ shopEnabled = true }: { shopEnabled?: boolean }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = shopEnabled
    ? marketingNavLinks
    : marketingNavLinks.filter((link) => link.href !== "/shopping");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="header-desktop">
        <Link href="/" className="logo focus-accent">
          {siteConfig.name}
        </Link>
        <nav className="nav-desktop dmt-filter-0" aria-label="Menu">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(`${link.href}/`)) ||
              (link.href === "/shopping" &&
                (pathname === "/shop" || pathname.startsWith("/shop/")));

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(active && "is-active")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="header-actions">
          {shopEnabled ? <HeaderCartLink /> : null}
          <Link href="/sign-up" className="btn-login-link">
            <button type="button" className="btn-login dmt-filter-1">
              Login / Sign Up
            </button>
          </Link>
        </div>
      </div>

      <div className="header-mobile">
        <button
          type="button"
          className="hamburger"
          aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(true)}
        >
          <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
          </svg>
        </button>
        <Link href="/" className="logo focus-accent">
          {siteConfig.name}
        </Link>
        <div className="header-actions">
          {shopEnabled ? <HeaderCartLink /> : null}
          <Link href="/sign-up">
            <button type="button" className="btn-login dmt-filter-1">
              Login
            </button>
          </Link>
        </div>
      </div>

      {menuOpen ? (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div
            id="mobile-navigation"
            className="menu-drawer"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <button
              type="button"
              className="menu-close"
              aria-label="关闭菜单"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
            <nav>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
