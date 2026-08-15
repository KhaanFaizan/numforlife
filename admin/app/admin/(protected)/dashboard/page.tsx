"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  Home,
  Layers,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { AuditActivityPanel } from "@/components/admin/AuditLogPanel";
import { IntegrationHealthSummary } from "@/components/admin/IntegrationHealthSummary";
import {
  AdminCard,
  AdminPanelHeader,
  AdminStatCard,
} from "@/components/admin/ui/AdminCard";
import { AdminLinkButton } from "@/components/admin/ui/AdminButton";
import { useCMS } from "@/lib/cms/content-provider";
import { BLOCK_LABELS } from "@/lib/cms/types";

const quickLinks = [
  {
    href: "/admin/homepage",
    title: "Edit Homepage",
    description: "Hero, images, features & footer",
    icon: Home,
    color: "from-accent/20 to-orange-100/50",
  },
  {
    href: "/admin/pages",
    title: "Manage Pages",
    description: "View publish status and page routes",
    icon: FileText,
    color: "from-blue-50 to-indigo-50",
  },
  {
    href: "/",
    title: "Preview Website",
    description: "Open the live frontend in a new tab",
    icon: ArrowUpRight,
    color: "from-emerald-50 to-teal-50",
    external: true,
  },
];

export default function AdminDashboardPage() {
  const { published } = useCMS();

  return (
    <>
      <AdminTopBar
        title="Dashboard"
        description="Visual CMS demo for 数易赋能 — manage content and preview changes instantly"
        badge="Live Demo"
      />

      <div className="flex-1 overflow-y-auto px-8 py-8">
        <AdminCard
          padding="lg"
          className="mb-8 overflow-hidden border-none bg-gradient-to-br from-[#111] via-[#1a1a1a] to-black text-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
        >
          <div className="relative">
            <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-accent/20 blur-[80px]" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] tracking-wider text-white/60 uppercase">
                  <Sparkles className="h-3 w-3 text-accent" />
                  Content Management
                </div>
                <h2 className="font-sans text-2xl font-bold tracking-tight md:text-3xl">
                  Welcome to your CMS workspace
                </h2>
                <p className="mt-2 max-w-xl font-mono text-sm leading-relaxed text-white/50">
                  Edit homepage content visually, reorder sections with drag-and-drop,
                  and publish changes to the live site with one click.
                </p>
              </div>
              <AdminLinkButton
                href="/admin/homepage"
                variant="accent"
                className="shrink-0 shadow-[0_8px_30px_rgba(255,193,7,0.3)]"
              >
                Open Homepage Editor
              </AdminLinkButton>
            </div>
          </div>
        </AdminCard>

        <div className="grid gap-5 md:grid-cols-3">
          <AdminStatCard
            label="Homepage Blocks"
            value={published.homepageBlocks.length}
            icon={<Layers className="h-5 w-5 text-black/60" />}
            accent="accent"
          />
          <AdminStatCard
            label="Feature Items"
            value={published.features.items.length}
            icon={<LayoutGrid className="h-5 w-5 text-black/60" />}
            accent="emerald"
          />
          <AdminStatCard
            label="Published Pages"
            value={published.pages.filter((p) => p.status === "published").length}
            icon={<FileText className="h-5 w-5 text-black/60" />}
          />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            const card = (
              <AdminCard className="group h-full transition-all hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color}`}
                >
                  <Icon className="h-5 w-5 text-black/70" />
                </div>
                <h2 className="font-sans text-lg font-bold text-black">
                  {item.title}
                </h2>
                <p className="mt-2 font-mono text-xs leading-relaxed text-black/45">
                  {item.description}
                </p>
                <p className="mt-4 font-sans text-xs font-semibold text-accent group-hover:underline">
                  Open →
                </p>
              </AdminCard>
            );

            return item.external ? (
              <Link key={item.href} href={item.href} target="_blank">
                {card}
              </Link>
            ) : (
              <Link key={item.href} href={item.href}>
                {card}
              </Link>
            );
          })}
        </div>

        <AdminCard className="mt-8" padding="lg">
          <AdminPanelHeader
            title="Current Homepage Order"
            description="Sections appear on the live site in this sequence"
            icon={<Layers className="h-5 w-5" />}
          />
          <div className="flex flex-wrap gap-2">
            {published.homepageBlocks.map((block, index) => (
              <span
                key={block.id}
                className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-[#f8f8f8] px-3 py-1.5"
              >
                <span className="font-mono text-[10px] font-bold text-black/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-xs font-medium text-black/70">
                  {BLOCK_LABELS[block.type]}
                </span>
              </span>
            ))}
          </div>
        </AdminCard>

        <IntegrationHealthSummary />

        <AuditActivityPanel />
      </div>
    </>
  );
}
