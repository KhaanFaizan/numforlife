"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function FloatingThemeControl({ className }: { className?: string }) {
  return <ThemeToggle className={className} />;
}
