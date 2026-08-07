"use client";

import { ReactNode } from "react";

type AdminTopBarProps = {
  title: string;
  description?: string;
  badge?: string;
  actions?: ReactNode;
};

export function AdminTopBar({
  title,
  description,
  badge,
  actions,
}: AdminTopBarProps) {
  return (
    <div className="sticky top-0 z-20 border-b border-black/[0.06] bg-white/80 px-8 py-5 backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-sans text-2xl font-bold tracking-tight text-black">
              {title}
            </h1>
            {badge && (
              <span className="rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide text-black/70 uppercase">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1.5 max-w-2xl font-mono text-xs leading-relaxed text-black/45">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex flex-wrap items-center gap-2.5">{actions}</div>
        )}
      </div>
    </div>
  );
}
