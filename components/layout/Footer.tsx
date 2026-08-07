import Link from "next/link";
import { footerLinks } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-8 md:px-10 lg:px-16 xl:px-20">
      <div className="mx-auto flex max-w-[1300px] flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-xs font-bold text-white transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="font-sans text-xs font-bold text-white">© 2035 by 数码麒麟</p>
      </div>
    </footer>
  );
}
