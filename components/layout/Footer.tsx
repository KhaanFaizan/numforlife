import Link from "next/link";
import { footerLinks } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-8">
      <div className="section-container mx-auto flex max-w-[1300px] flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-xs font-bold text-fg transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="font-sans text-xs font-bold text-fg">© 2035 by 数码麒麟</p>
      </div>
    </footer>
  );
}
