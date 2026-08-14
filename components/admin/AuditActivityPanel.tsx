"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

import { AdminPanelHeader } from "@/components/admin/ui/AdminCard";

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
  "media.delete": "Deleted media",
  "settings.update_flags": "Updated feature flags",
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

export function AuditActivityPanel() {
  const [logs, setLogs] = useState<AuditLogRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch("/api/admin/audit-logs", { cache: "no-store" });
        if (!response.ok) throw new Error("Unable to load audit log.");
        const body = (await response.json()) as { logs: AuditLogRow[] };
        if (!cancelled) setLogs(body.logs);
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error ? loadError.message : "Unable to load audit log.",
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mt-8 rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-8">
      <AdminPanelHeader
        title="Recent Admin Activity"
        description="Append-only audit trail for sign-in and CMS actions"
        icon={<Shield className="h-5 w-5" />}
      />

      {error ? (
        <p className="mt-4 font-mono text-xs text-red-600">{error}</p>
      ) : logs.length === 0 ? (
        <p className="mt-4 font-mono text-xs text-black/45">No audit events yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-black/[0.06]">
          {logs.map((log) => (
            <li key={log.id} className="flex flex-col gap-1 py-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-sans text-sm font-semibold text-black">
                  {ACTION_LABELS[log.action] ?? log.action}
                </p>
                <p className="font-mono text-[11px] text-black/45">
                  {log.adminEmail} · {log.adminRole.replaceAll("_", " ")}
                  {log.target ? ` · ${log.target}` : ""}
                </p>
              </div>
              <time className="font-mono text-[11px] text-black/35">{formatWhen(log.createdAt)}</time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
