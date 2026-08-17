"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "reference";
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
    "inline-flex min-h-[44px] items-center justify-center gap-2 transition-all duration-200 focus-accent disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "rounded-[30px] bg-accent px-8 py-3 font-mono text-xs font-medium text-white hover:opacity-90",
    reference:
      "rounded-[30px] bg-accent px-8 py-3 font-mono text-xs font-medium text-white hover:opacity-90",
    outline:
      "rounded-[30px] border-2 border-accent bg-transparent px-8 py-3 font-mono text-xs font-medium text-accent hover:bg-accent hover:text-black",
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
