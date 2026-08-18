"use client";

import { useEffect, useState } from "react";
import {
  THEME_COOKIE,
  THEME_COOKIE_MAX_AGE,
} from "@/lib/theme";

const STORAGE_KEY = "darkmode";

function applyMode(on: boolean) {
  document.documentElement.classList.toggle("darkmode--activated", on);
  document.body.classList.toggle("darkmode--activated", on);
  document.cookie = `${THEME_COOKIE}=${on ? "light" : "dark"}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
  try {
    localStorage.setItem(STORAGE_KEY, on ? "true" : "false");
  } catch {
    /* ignore private-mode quota */
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const saved = document.documentElement.classList.contains("darkmode--activated");
    setOn(saved);
    applyMode(saved);
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("darkmode--activated");
    applyMode(next);
    setOn(next);
  }

  return (
    <button
      type="button"
      className={`darkmode-toggle${on ? " darkmode-toggle--white" : ""}${className ? ` ${className}` : ""}`}
      aria-label={on ? "切换深色主题" : "切换浅色主题"}
      aria-pressed={on}
      aria-checked={on}
      role="checkbox"
      onClick={toggle}
    >
      <SunIcon />
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <circle cx="12" cy="12" r="4.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 2.5v2.4" />
        <path d="M12 19.1v2.4" />
        <path d="M2.5 12h2.4" />
        <path d="M19.1 12h2.4" />
        <path d="M5.3 5.3l1.7 1.7" />
        <path d="M17 17l1.7 1.7" />
        <path d="M18.7 5.3l-1.7 1.7" />
        <path d="M7 17l-1.7 1.7" />
      </g>
    </svg>
  );
}
