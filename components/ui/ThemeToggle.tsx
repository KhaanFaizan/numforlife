"use client";

import { useCallback, useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import {
  THEME_COOKIE,
  THEME_COOKIE_MAX_AGE,
  isThemePreference,
  type ThemePreference,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

const OPTIONS: { value: ThemePreference; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "浅色", Icon: Sun },
  { value: "dark", label: "深色", Icon: Moon },
  { value: "system", label: "跟随系统", Icon: Monitor },
];

function readCookiePreference(): ThemePreference {
  if (typeof document === "undefined") return "system";
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${THEME_COOKIE}=`));
  const value = match?.split("=")[1];
  return isThemePreference(value) ? value : "system";
}

function applyPreference(preference: ThemePreference) {
  const root = document.documentElement;

  // "system" removes the attribute so the prefers-color-scheme media query
  // resumes control. Setting data-theme="system" would match no CSS rule and
  // silently leave the user on the light palette.
  if (preference === "system") {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = preference;
  }

  document.cookie = `${THEME_COOKIE}=${preference}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function ThemeToggle({ className }: { className?: string }) {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [mounted, setMounted] = useState(false);

  // The server already stamped the correct theme, so we only sync local state
  // here — we never re-apply on mount, which would cause a visible flicker.
  useEffect(() => {
    setPreference(readCookiePreference());
    setMounted(true);
  }, []);

  const select = useCallback((next: ThemePreference) => {
    setPreference(next);
    applyPreference(next);
  }, []);

  return (
    <div
      role="radiogroup"
      aria-label="主题模式"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-surface p-0.5",
        className,
      )}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        // Before hydration we cannot know the stored preference without risking
        // a mismatch, so no option is marked active on the server pass.
        const active = mounted && preference === value;

        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => select(value)}
            className={cn(
              "focus-accent flex h-8 w-8 items-center justify-center rounded-full transition-colors",
              active
                ? "bg-accent text-accent-fg"
                : "text-fg-subtle hover:bg-accent-soft hover:text-fg",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
