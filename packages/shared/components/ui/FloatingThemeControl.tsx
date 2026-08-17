"use client";

import { useEffect, useState } from "react";
import { Sun } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function FloatingThemeControl({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className={cn("fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6", className)}>
      {open ? (
        <div className="mb-3 rounded-2xl border border-border bg-black/95 p-1 shadow-lg backdrop-blur-sm">
          <ThemeToggle />
        </div>
      ) : null}

      <button
        type="button"
        aria-label="主题设置"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="focus-accent flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-black/90 text-accent shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-colors hover:border-accent hover:bg-black"
      >
        <Sun className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}
