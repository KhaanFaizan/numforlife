"use client";

import Link from "next/link";
import { ExternalLink, FileText, Pencil, Search } from "lucide-react";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { AdminCard, AdminPanelHeader } from "@/components/admin/ui/AdminCard";
import { useCMS } from "@/lib/cms/content-provider";

export default function AdminPagesPage() {
  const { published } = useCMS();

  return (
    <>
      <AdminTopBar
        title="Pages Management"
        description="Manage website pages and jump into the homepage editor"
        badge={`${published.pages.length} Pages`}
      />

      <div className="flex-1 overflow-y-auto px-8 py-8">
        <AdminCard padding="none" className="overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-black/[0.05] bg-[#fafafa] px-6 py-5 md:flex-row md:items-center md:justify-between">
            <AdminPanelHeader
              title="All Pages"
              description="Overview of site routes and publish status"
              icon={<FileText className="h-5 w-5" />}
            />
            <div className="relative w-full md:w-72">
              <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-black/30" />
              <input
                readOnly
                placeholder="Search pages..."
                className="w-full rounded-xl border border-black/[0.08] bg-white py-2.5 pr-4 pl-10 font-sans text-sm text-black/50 outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-black/[0.05]">
                  {["Page", "Slug", "Status", "Last Updated", "Actions"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-6 py-4 font-mono text-[10px] font-semibold tracking-[0.12em] text-black/40 uppercase"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {published.pages.map((page) => (
                  <tr
                    key={page.id}
                    className="border-b border-black/[0.03] transition-colors last:border-0 hover:bg-[#fafafa]/80"
                  >
                    <td className="px-6 py-4">
                      <p className="font-sans text-sm font-semibold text-black">
                        {page.title}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <code className="rounded-lg bg-black/[0.04] px-2.5 py-1 font-mono text-xs text-black/55">
                        {page.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-medium ${
                          page.status === "published"
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                            : "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            page.status === "published"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        />
                        {page.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-black/45">
                      {page.lastUpdated}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {page.slug === "/" ? (
                          <Link
                            href="/admin/homepage"
                            className="inline-flex items-center gap-2 rounded-xl bg-black px-3.5 py-2 font-sans text-xs font-semibold text-white shadow-sm transition-all hover:bg-black/90"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </Link>
                        ) : (
                          <span className="rounded-lg bg-black/[0.04] px-3 py-2 font-mono text-[10px] text-black/35">
                            Demo only
                          </span>
                        )}
                        <Link
                          href={page.slug}
                          target="_blank"
                          className="inline-flex items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-3.5 py-2 font-sans text-xs font-semibold text-black transition-colors hover:bg-[#fafafa]"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      </div>
    </>
  );
}
