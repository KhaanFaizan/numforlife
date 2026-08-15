"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Activity, RefreshCw } from "lucide-react";

import { AdminCard, AdminPanelHeader } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import type { IntegrationCheck, IntegrationHealthReport } from "@/lib/integrations/types";

const STATUS_STYLES: Record<IntegrationCheck["status"], string> = {
  ok: "border-emerald-200 bg-emerald-50 text-emerald-800",
  degraded: "border-amber-200 bg-amber-50 text-amber-800",
  error: "border-red-200 bg-red-50 text-red-800",
  unconfigured: "border-black/10 bg-[#fafafa] text-black/50",
};

const HIGHLIGHT_IDS = ["cms_sqlite", "app_mysql", "plenorhub", "redirect_manifest"];

export function IntegrationHealthSummary() {
  const [report, setReport] = useState<IntegrationHealthReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReport = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/integrations/health", { cache: "no-store" });
      const body = (await response.json()) as IntegrationHealthReport & { error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to load health report.");
      }

      setReport(body);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load health report.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadReport();
  }, [loadReport]);

  const highlights =
    report?.checks.filter((check) => HIGHLIGHT_IDS.includes(check.id)) ?? [];

  return (
    <AdminCard padding="lg" className="mt-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <AdminPanelHeader
          title="System Status"
          description={
            report
              ? `Checked ${new Date(report.checkedAt).toLocaleString("zh-CN")}`
              : "CMS, database, commerce, and redirect sync"
          }
          icon={<Activity className="h-5 w-5" />}
        />
        <div className="flex flex-wrap gap-2">
          <AdminButton type="button" size="sm" variant="secondary" disabled={loading} onClick={() => void loadReport()}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </AdminButton>
          <Link
            href="/admin/integrations"
            className="inline-flex min-h-[36px] items-center rounded-full border border-black/10 px-4 font-sans text-xs font-semibold text-black/70 hover:bg-black/[0.02]"
          >
            All checks →
          </Link>
        </div>
      </div>

      {error ? (
        <p className="mt-4 font-mono text-xs text-red-600">{error}</p>
      ) : loading && !report ? (
        <p className="mt-4 font-mono text-xs text-black/45">Running checks...</p>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map((check) => (
            <div
              key={check.id}
              className={`rounded-2xl border px-4 py-4 ${STATUS_STYLES[check.status]}`}
            >
              <p className="font-sans text-sm font-semibold">{check.name}</p>
              <p className="mt-1 font-mono text-[11px] opacity-80">{check.message}</p>
              {check.detail ? (
                <p className="mt-1 font-mono text-[10px] opacity-60">{check.detail}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </AdminCard>
  );
}
