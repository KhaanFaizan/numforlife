"use client";

import { useEffect, useState } from "react";
import { History, RotateCcw } from "lucide-react";
import type { ContentVersionSummary } from "@/lib/cms/types";
import { useCMS } from "@/lib/cms/content-provider";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard, AdminPanelHeader } from "@/components/admin/ui/AdminCard";

const stateLabels: Record<string, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

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
        <AdminPanelHeader
          title="Version History"
          description="Restore a previous version into the current draft"
          icon={<History className="h-5 w-5" />}
        />
      </div>

      <div className="p-4">
        {loading ? (
          <p className="font-mono text-xs text-black/45">Loading versions...</p>
        ) : error ? (
          <p className="font-sans text-sm text-red-600">{error}</p>
        ) : versions.length === 0 ? (
          <p className="font-mono text-xs text-black/45">No versions yet.</p>
        ) : (
          <ul className="space-y-2">
            {versions.map((version) => (
              <li
                key={version.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-black/[0.06] bg-white px-3 py-3"
              >
                <div>
                  <p className="font-sans text-sm font-semibold text-black">
                    v{version.versionNo}
                  </p>
                  <p className="font-mono text-[10px] text-black/45">
                    {stateLabels[version.state] ?? version.state} ·{" "}
                    {new Date(version.createdAt).toLocaleString()}
                  </p>
                </div>
                <AdminButton
                  type="button"
                  size="sm"
                  variant="secondary"
                  loading={isSaving}
                  onClick={async () => {
                    await restoreVersion(version.id);
                    await loadVersions();
                  }}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Restore
                </AdminButton>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminCard>
  );
}
