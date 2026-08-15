"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { MemberSession } from "@/lib/auth/types";
import type { MemberDashboardData } from "@/lib/member/types";
import { displayName } from "@/lib/member/format";
import { DashboardNav } from "./DashboardNav";
import { DashboardQuickActions, DashboardStatCards } from "./DashboardStatCards";

function initials(name: string) {
  return name.trim().slice(0, 1).toUpperCase() || "会";
}

export function DashboardShell({
  session,
  data,
  children,
}: {
  session: MemberSession;
  data: MemberDashboardData;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const name = displayName({
    nickname: data.profile.nickname,
    email: data.profile.email,
    name: session.name,
  });

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/member/session", { method: "DELETE" });
      router.push("/login");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className="page-shell min-h-screen">
      <div className="section-container py-8 md:py-10">
        <header className="rounded-[28px] border border-border bg-surface p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {data.profile.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.profile.avatar}
                  alt=""
                  className="h-16 w-16 rounded-2xl object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-2xl font-bold text-accent-fg">
                  {initials(name)}
                </div>
              )}

              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] text-accent-ink uppercase">
                  My Account
                </p>
                <h1 className="cjk mt-1 font-sans text-2xl font-semibold text-fg md:text-3xl">
                  {name}
                </h1>
                <p className="mt-1 font-sans text-sm text-fg-muted">
                  {data.profile.email ?? session.email ?? "—"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-accent-soft px-4 py-2 font-sans text-sm font-semibold text-accent-ink">
                {data.membership.levelName}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="focus-accent inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border px-4 py-2 font-sans text-sm text-fg transition-colors hover:border-accent disabled:opacity-60"
              >
                <LogOut className="h-4 w-4" />
                退出登录
              </button>
            </div>
          </div>
        </header>

        <div className="mt-6 space-y-6">
          <DashboardStatCards data={data} />
          <DashboardQuickActions />
          <DashboardNav />
        </div>

        <div className="mt-8 space-y-8">{children}</div>
      </div>
    </div>
  );
}
