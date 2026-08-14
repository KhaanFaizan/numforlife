"use client";

import { useCallback, useEffect, useState } from "react";
import { Activity, RefreshCw, ToggleLeft, ToggleRight } from "lucide-react";

import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard, AdminPanelHeader } from "@/components/admin/ui/AdminCard";
import type { IntegrationCheck, IntegrationHealthReport } from "@/lib/integrations/types";
import type { SiteFlagKey } from "@/lib/settings/flags";

type FlagRow = {
  key: SiteFlagKey;
  label: string;
  description: string;
  defaultValue: boolean;
  value: boolean;
};

const STATUS_STYLES: Record<IntegrationCheck["status"], string> = {
  ok: "bg-emerald-100 text-emerald-700",
  degraded: "bg-amber-100 text-amber-700",
  error: "bg-red-100 text-red-700",
  unconfigured: "bg-black/10 text-black/50",
};

export function IntegrationsPanel() {
  const [report, setReport] = useState<IntegrationHealthReport | null>(null);
  const [flags, setFlags] = useState<FlagRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [healthResponse, flagsResponse] = await Promise.all([
        fetch("/api/admin/integrations/health", { cache: "no-store" }),
        fetch("/api/admin/settings/flags", { cache: "no-store" }),
      ]);

      const healthBody = (await healthResponse.json()) as IntegrationHealthReport & {
        error?: string;
      };
      const flagsBody = (await flagsResponse.json()) as {
        flags?: FlagRow[];
        error?: string;
      };

      if (!healthResponse.ok) {
        throw new Error(healthBody.error ?? "Unable to load integration health.");
      }

      if (!flagsResponse.ok) {
        throw new Error(flagsBody.error ?? "Unable to load feature flags.");
      }

      setReport(healthBody);
      setFlags(flagsBody.flags ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load integrations.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const toggleFlag = async (key: SiteFlagKey, value: boolean) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/settings/flags", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });

      const body = (await response.json()) as { flags?: FlagRow[]; error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to update flag.");
      }

      setFlags(body.flags ?? []);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to update flag.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminTopBar
        title="Integrations & Flags"
        description="Live health checks for connected services and lightweight feature toggles."
        badge="Ops"
      />

      <div className="flex-1 overflow-y-auto px-8 py-8">
        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-mono text-xs text-red-700">
            {error}
          </div>
        ) : null}

        <AdminCard padding="lg" className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <AdminPanelHeader
              title="Integration Health"
              description={
                report
                  ? `Last checked ${new Date(report.checkedAt).toLocaleString("zh-CN")}`
                  : "Checking CMS, database, PlenorHub, numerology upstream, and env config"
              }
              icon={<Activity className="h-5 w-5" />}
            />
            <AdminButton type="button" disabled={loading} onClick={() => void loadAll()}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </AdminButton>
          </div>

          {loading && !report ? (
            <p className="mt-6 font-mono text-xs text-black/45">Running checks...</p>
          ) : (
            <ul className="mt-6 divide-y divide-black/[0.06]">
              {(report?.checks ?? []).map((check) => (
                <li
                  key={check.id}
                  className="flex flex-col gap-2 py-4 md:flex-row md:items-start md:justify-between"
                >
                  <div>
                    <p className="font-sans text-sm font-semibold text-black">{check.name}</p>
                    <p className="mt-1 font-mono text-[11px] text-black/50">{check.message}</p>
                    {check.detail ? (
                      <p className="mt-1 font-mono text-[11px] text-black/35">{check.detail}</p>
                    ) : null}
                  </div>
                  <span
                    className={`inline-flex shrink-0 rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase ${STATUS_STYLES[check.status]}`}
                  >
                    {check.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>

        <AdminCard padding="lg">
          <AdminPanelHeader
            title="Feature Flags"
            description="Runtime toggles stored in SQLite and synced to public/site-flags.json"
          />

          <ul className="mt-6 space-y-4">
            {flags.map((flag) => (
              <li
                key={flag.key}
                className="flex flex-col gap-4 rounded-2xl border border-black/[0.06] bg-[#fafafa] p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-sans text-sm font-semibold text-black">{flag.label}</p>
                  <p className="mt-1 max-w-2xl font-mono text-[11px] leading-relaxed text-black/50">
                    {flag.description}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => void toggleFlag(flag.key, !flag.value)}
                  className="inline-flex items-center gap-2 self-start rounded-full border border-black/10 bg-white px-4 py-2 font-mono text-xs text-black/70 hover:bg-black/[0.02] disabled:opacity-60"
                >
                  {flag.value ? (
                    <ToggleRight className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <ToggleLeft className="h-4 w-4 text-black/35" />
                  )}
                  {flag.value ? "On" : "Off"}
                </button>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>
    </>
  );
}
