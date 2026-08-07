"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
  disabled = false,
  loading = false,
}: ButtonProps) {
  const reducedMotion = useReducedMotion();

  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-sans text-sm font-semibold transition-all duration-300 focus-accent disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-accent text-black shadow-[0_8px_24px_rgba(255,193,7,0.25)] hover:bg-accent-hover hover:shadow-[0_12px_32px_rgba(255,78,39,0.2)]",
    outline:
      "border border-white/30 bg-transparent text-white hover:border-accent hover:text-accent",
  };

  const classes = cn(baseStyles, variants[variant], className);
  const content = loading ? (
    <>
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      {children}
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <motion.div
        whileHover={reducedMotion ? undefined : { scale: 1.03 }}
        whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      >
        <Link href={href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={reducedMotion ? undefined : { scale: 1.03 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.25, ease: easeOutExpo }}
      className={classes}
    >
      {content}
    </motion.button>
  );
}
