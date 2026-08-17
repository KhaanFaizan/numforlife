import Link from "next/link";
import { footerLinks } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-8 text-white">
      <div className="section-container mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-xs font-bold text-white transition-opacity hover:opacity-70 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="font-mono text-xs font-medium text-white">© 2035 by 数易赋能</p>
      </div>
    </footer>
  );
}
