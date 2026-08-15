"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronRight,
  Activity,
  ExternalLink,
  FileText,
  Home,
  Images,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Route,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import type { AdminSession } from "@/lib/auth/types";
import { cn } from "@/lib/utils";

const navItems = [
  {
    section: "Content",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/pages", label: "Pages", icon: FileText },
      { href: "/admin/homepage", label: "Homepage Editor", icon: Home },
      { href: "/admin/banners", label: "Banners", icon: Megaphone },
      { href: "/admin/media", label: "Media Library", icon: Images },
      { href: "/admin/redirects", label: "Redirects", icon: Route },
      { href: "/admin/preview", label: "Draft Preview", icon: ExternalLink },
    ],
  },
  {
    section: "Support",
    items: [{ href: "/admin/users", label: "User Lookup", icon: Users }],
  },
  {
    section: "Ops",
    items: [
      { href: "/admin/integrations", label: "Integrations", icon: Activity },
      { href: "/admin/audit", label: "Audit Log", icon: Shield },
    ],
  },
];

const roleLabels: Record<AdminSession["role"], string> = {
  super_admin: "Super Admin",
  content_editor: "Content Editor",
  marketing_admin: "Marketing Admin",
  support_admin: "Support Admin",
  developer_admin: "Developer Admin",
  read_only_admin: "Read Only",
};

export function AdminSidebar({ session }: { session: AdminSession }) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/auth/session", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <aside className="relative flex min-h-screen w-[280px] shrink-0 flex-col self-stretch border-r border-white/[0.06] bg-[#080808]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,193,7,0.08),transparent_50%)]" />

      <div className="relative flex min-h-full flex-1 flex-col">
        <div className="relative shrink-0 border-b border-white/[0.06] px-6 py-7">
          <div className="flex items-center gap-3.5">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-[#ffb300] shadow-[0_8px_24px_rgba(255,193,7,0.25)]">
              <Sparkles className="h-5 w-5 text-black" />
            </div>
            <div>
              <p className="font-sans text-[15px] font-bold tracking-tight text-white">
                数易 CMS
              </p>
              <p className="font-mono text-[10px] tracking-wide text-white/40 uppercase">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        <nav className="relative flex-1 space-y-6 px-4 py-6">
          {navItems.map((group) => (
            <div key={group.section}>
              <p className="mb-2 px-3 font-mono text-[10px] font-medium tracking-[0.15em] text-white/30 uppercase">
                {group.section}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "focus-accent group flex items-center gap-3 rounded-xl px-3 py-2.5 font-sans text-[13px] font-medium transition-all",
                        active
                          ? "bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.12)]"
                          : "text-white/55 hover:bg-white/[0.06] hover:text-white",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                          active
                            ? "bg-accent/20 text-black"
                            : "bg-white/[0.04] text-white/50 group-hover:bg-white/[0.08] group-hover:text-white",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {active && (
                        <ChevronRight className="h-3.5 w-3.5 text-black/30" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="relative mt-auto shrink-0 space-y-1 border-t border-white/[0.06] p-4">
          <div className="mb-3 rounded-xl bg-white/[0.04] px-3 py-3">
            <p className="font-sans text-xs font-semibold text-white/80">
              {session.name ?? session.email}
            </p>
            <p className="mt-0.5 font-mono text-[10px] leading-relaxed text-white/35">
              {roleLabels[session.role]}
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="focus-accent flex items-center gap-3 rounded-xl px-3 py-2.5 font-sans text-[13px] text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            View Website
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="focus-accent flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-sans text-[13px] text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            {signingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </div>
    </aside>
  );
}
