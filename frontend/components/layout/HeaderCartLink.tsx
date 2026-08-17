import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

type HeaderCartLinkProps = {
  href?: string;
  className?: string;
  /** Reference uses orange cart icon on mobile. */
  variant?: "desktop" | "mobile";
};

export function HeaderCartLink({
  href = "/shop",
  className,
  variant = "desktop",
}: HeaderCartLinkProps) {
  const iconColor = variant === "mobile" ? "text-accent-hover" : "text-white";

  return (
    <Link
      href={href}
      aria-label="商店购物车"
      className={cn(
        "focus-accent relative inline-flex h-10 w-10 items-center justify-center rounded-lg transition-opacity hover:opacity-80",
        className,
      )}
    >
      <ShoppingCart className={cn("h-[22px] w-[22px]", iconColor)} strokeWidth={1.75} />
      <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-black">
        0
      </span>
    </Link>
  );
}
