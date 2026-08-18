"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "reference" | "black";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
};

const variants = {
  primary: "btn-pill",
  reference: "btn-pill",
  outline: "btn-pill",
  black: "btn-black",
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
  const classes = cn(variants[variant], className);
  const content = loading ? "…" : children;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {content}
    </button>
  );
}
