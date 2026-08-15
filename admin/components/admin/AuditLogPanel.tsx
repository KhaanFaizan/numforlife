"use client";

import { useCallback, useEffect, useState } from "react";
import { Shield } from "lucide-react";

import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { AdminCard, AdminPanelHeader } from "@/components/admin/ui/AdminCard";

type AuditLogRow = {
  id: string;
  adminEmail: string;
  adminRole: string;
  action: string;
  module: string;
  target: string | null;
  createdAt: string;
};

const ACTION_LABELS: Record<string, string> = {
  "auth.login": "Signed in",
  "auth.logout": "Signed out",
  "cms.publish": "Published homepage",
  "cms.reset": "Reset draft to defaults",
  "cms.restore": "Restored version",
  "redirects.create": "Created redirect",
  "redirects.update": "Updated redirect",
  "redirects.delete": "Deleted redirect",
  "support.view_member": "Viewed member record",
  "media.upload": "Uploaded media",
  "media.update": "Updated media alt text",
  "media.delete": "Deleted media",
  "settings.update_flags": "Updated feature flags",
  "banners.create": "Created banner",
  "banners.update": "Updated banner",
  "banners.delete": "Deleted banner",
};

function formatWhen(value: string) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function AuditLogPanel({ limit = 50 }: { limit?: number }) {
  const [logs, setLogs] = useState<AuditLogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/audit-logs?limit=${limit}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load audit log.");
      const body = (await response.json()) as { logs: AuditLogRow[] };
      setLogs(body.logs);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load audit log.");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    void loadLogs();
  }, [loadLogs]);

  return (
    <AdminCard padding="lg">
      <AdminPanelHeader
        title="Audit Log"
        description="Append-only record of admin sign-in, CMS, media, banner, and settings actions"
        icon={<Shield className="h-5 w-5" />}
      />

      {error ? (
        <p className="mt-4 font-mono text-xs text-red-600">{error}</p>
      ) : loading ? (
        <p className="mt-4 font-mono text-xs text-black/45">Loading audit events...</p>
      ) : logs.length === 0 ? (
        <p className="mt-4 font-mono text-xs text-black/45">No audit events yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-black/[0.06]">
          {logs.map((log) => (
            <li
              key={log.id}
              className="flex flex-col gap-1 py-3 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-sans text-sm font-semibold text-black">
                  {ACTION_LABELS[log.action] ?? log.action}
                </p>
                <p className="font-mono text-[11px] text-black/45">
                  {log.adminEmail} · {log.adminRole.replaceAll("_", " ")} · {log.module}
                  {log.target ? ` · ${log.target}` : ""}
                </p>
              </div>
              <time className="font-mono text-[11px] text-black/35">{formatWhen(log.createdAt)}</time>
            </li>
          ))}
        </ul>
      )}
    </AdminCard>
  );
}

export function AuditActivityPanel() {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-sans text-lg font-bold text-black">Recent Admin Activity</h2>
        <a
          href="/admin/audit"
          className="font-sans text-xs font-semibold text-accent hover:underline"
        >
          View full log →
        </a>
      </div>
      <AuditLogPanel limit={8} />
    </section>
  );
}
