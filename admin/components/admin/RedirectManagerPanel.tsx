"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Plus, Trash2 } from "lucide-react";

import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard, AdminPanelHeader } from "@/components/admin/ui/AdminCard";
import type { RedirectMatchType, RedirectRule } from "@/lib/redirects/types";

type FormState = {
  sourcePath: string;
  destinationPath: string;
  matchType: RedirectMatchType;
  note: string;
};

const emptyForm: FormState = {
  sourcePath: "",
  destinationPath: "",
  matchType: "exact",
  note: "",
};

export function RedirectManagerPanel() {
  const [rules, setRules] = useState<RedirectRule[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manifestUpdatedAt, setManifestUpdatedAt] = useState<string | null>(null);

  const loadRules = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/redirects", { cache: "no-store" });
      const body = (await response.json()) as {
        rules?: RedirectRule[];
        manifestUpdatedAt?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to load redirects.");
      }

      setRules(body.rules ?? []);
      setManifestUpdatedAt(body.manifestUpdatedAt ?? null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load redirects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRules();
  }, [loadRules]);

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to create redirect.");
      }

      setForm(emptyForm);
      await loadRules();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to create redirect.");
    } finally {
      setSaving(false);
    }
  };

  const toggleEnabled = async (rule: RedirectRule) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/redirects/${rule.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !rule.enabled }),
      });

      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to update redirect.");
      }

      await loadRules();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Unable to update redirect.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (rule: RedirectRule) => {
    if (!window.confirm(`Delete redirect ${rule.sourcePath} → ${rule.destinationPath}?`)) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/redirects/${rule.id}`, {
        method: "DELETE",
      });

      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to delete redirect.");
      }

      await loadRules();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete redirect.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminTopBar
        title="Redirect Manager"
        description="Manage WordPress → Next.js URL redirects. Changes sync to the live proxy within ~15 seconds."
        badge="Migration"
      />

      <div className="flex-1 overflow-y-auto px-8 py-8">
        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-mono text-xs text-red-700">
            {error}
          </div>
        ) : null}

        <AdminCard padding="lg" className="mb-8">
          <AdminPanelHeader
            title="Add Redirect"
            description="Exact matches take priority over prefix rules. Paths must start with /."
          />
          <form onSubmit={handleCreate} className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wide text-black/45">
                Source path
              </span>
              <input
                required
                value={form.sourcePath}
                onChange={(event) =>
                  setForm((current) => ({ ...current, sourcePath: event.target.value }))
                }
                placeholder="/old-wordpress-path"
                className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 font-mono text-sm"
              />
            </label>
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wide text-black/45">
                Destination path
              </span>
              <input
                required
                value={form.destinationPath}
                onChange={(event) =>
                  setForm((current) => ({ ...current, destinationPath: event.target.value }))
                }
                placeholder="/new-path"
                className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 font-mono text-sm"
              />
            </label>
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wide text-black/45">
                Match type
              </span>
              <select
                value={form.matchType}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    matchType: event.target.value as RedirectMatchType,
                  }))
                }
                className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 font-sans text-sm"
              >
                <option value="exact">Exact path</option>
                <option value="prefix">Prefix (includes subpaths)</option>
              </select>
            </label>
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wide text-black/45">
                Note (optional)
              </span>
              <input
                value={form.note}
                onChange={(event) =>
                  setForm((current) => ({ ...current, note: event.target.value }))
                }
                placeholder="Why this redirect exists"
                className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 font-sans text-sm"
              />
            </label>
            <div className="md:col-span-2">
              <AdminButton type="submit" disabled={saving}>
                <Plus className="h-4 w-4" />
                {saving ? "Saving..." : "Add Redirect"}
              </AdminButton>
            </div>
          </form>
        </AdminCard>

        <AdminCard padding="lg">
          <AdminPanelHeader
            title="Active Rules"
            description={
              manifestUpdatedAt
                ? `Manifest synced ${new Date(manifestUpdatedAt).toLocaleString("zh-CN")}`
                : "Manifest not synced yet"
            }
          />

          {loading ? (
            <p className="mt-6 font-mono text-xs text-black/45">Loading redirects...</p>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-[760px] w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="px-3 py-3 font-mono text-[11px] uppercase text-black/45">
                      Source
                    </th>
                    <th className="px-3 py-3 font-mono text-[11px] uppercase text-black/45">
                      Destination
                    </th>
                    <th className="px-3 py-3 font-mono text-[11px] uppercase text-black/45">
                      Type
                    </th>
                    <th className="px-3 py-3 font-mono text-[11px] uppercase text-black/45">
                      Status
                    </th>
                    <th className="px-3 py-3 font-mono text-[11px] uppercase text-black/45">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((rule) => (
                    <tr key={rule.id} className="border-b border-black/[0.06] last:border-b-0">
                      <td className="px-3 py-4 font-mono text-sm text-black">{rule.sourcePath}</td>
                      <td className="px-3 py-4">
                        <span className="inline-flex items-center gap-2 font-mono text-sm text-black/70">
                          <ArrowRight className="h-3.5 w-3.5" />
                          {rule.destinationPath}
                        </span>
                      </td>
                      <td className="px-3 py-4 font-mono text-xs uppercase text-black/50">
                        {rule.matchType}
                      </td>
                      <td className="px-3 py-4">
                        <button
                          type="button"
                          disabled={saving}
                          onClick={() => void toggleEnabled(rule)}
                          className={`rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase ${
                            rule.enabled
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-black/10 text-black/45"
                          }`}
                        >
                          {rule.enabled ? "Enabled" : "Disabled"}
                        </button>
                      </td>
                      <td className="px-3 py-4">
                        <button
                          type="button"
                          disabled={saving}
                          onClick={() => void handleDelete(rule)}
                          className="inline-flex items-center gap-2 font-mono text-xs text-red-600 hover:underline"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminCard>
      </div>
    </>
  );
}
