"use client";

import { useEffect, useState } from "react";
import { History, RefreshCw, RotateCcw } from "lucide-react";
import type { ContentVersionSummary } from "@/lib/cms/types";
import { useCMS } from "@/lib/cms/content-provider";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard, AdminPanelHeader } from "@/components/admin/ui/AdminCard";

const stateLabels: Record<string, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
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

export function VersionHistoryPanel() {
  const { listVersions, restoreVersion, isSaving } = useCMS();
  const [versions, setVersions] = useState<ContentVersionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVersions = async () => {
    setLoading(true);
    setError(null);

    try {
      setVersions(await listVersions());
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Failed to load versions.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadVersions();
  }, []);

  return (
    <AdminCard padding="none" className="overflow-hidden">
      <div className="border-b border-black/[0.05] bg-[#fafafa] px-6 py-5">
        <div className="flex items-start justify-between gap-3">
          <AdminPanelHeader
            title="Version History"
            description="Restore a previous homepage version into the current draft, then publish when ready."
            icon={<History className="h-5 w-5" />}
          />
          <AdminButton type="button" size="sm" variant="secondary" disabled={loading} onClick={() => void loadVersions()}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </AdminButton>
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <p className="font-mono text-xs text-black/45">Loading versions...</p>
        ) : error ? (
          <p className="font-sans text-sm text-red-600">{error}</p>
        ) : versions.length === 0 ? (
          <p className="font-mono text-xs text-black/45">No versions yet. Publish once to create history.</p>
        ) : (
          <ul className="space-y-2">
            {versions.map((version) => (
              <li
                key={version.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-black/[0.06] bg-white px-3 py-3"
              >
                <div>
                  <p className="font-sans text-sm font-semibold text-black">
                    Version {version.versionNo}
                  </p>
                  <p className="font-mono text-[10px] text-black/45">
                    {stateLabels[version.state] ?? version.state} · {formatWhen(version.createdAt)}
                  </p>
                </div>
                <AdminButton
                  type="button"
                  size="sm"
                  variant="secondary"
                  loading={isSaving}
                  onClick={async () => {
                    const confirmed = window.confirm(
                      `Restore version ${version.versionNo} into the current draft? Unsaved draft changes will be replaced.`,
                    );
                    if (!confirmed) return;

                    await restoreVersion(version.id);
                    await loadVersions();
                  }}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Restore to draft
                </AdminButton>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminCard>
  );
}
