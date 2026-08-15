"use client";

import { useCallback, useEffect, useState } from "react";
import { Megaphone, Plus, Trash2 } from "lucide-react";

import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard, AdminPanelHeader } from "@/components/admin/ui/AdminCard";
import type { SiteBanner, SiteBannerInput } from "@/lib/banners/types";

const VARIANTS = [
  { value: "info", label: "Info" },
  { value: "promo", label: "Promo" },
  { value: "warning", label: "Warning" },
] as const;

const emptyForm: SiteBannerInput = {
  title: "",
  message: "",
  href: "",
  ctaLabel: "",
  variant: "info",
  enabled: true,
  priority: 0,
  startsAt: "",
  endsAt: "",
};

function toDatetimeLocal(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function fromDatetimeLocal(value: string) {
  return value.trim() ? new Date(value).toISOString() : null;
}

export function BannersPanel() {
  const [banners, setBanners] = useState<SiteBanner[]>([]);
  const [form, setForm] = useState<SiteBannerInput>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBanners = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/banners", { cache: "no-store" });
      const body = (await response.json()) as { banners?: SiteBanner[]; error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to load banners.");
      }

      setBanners(body.banners ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load banners.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBanners();
  }, [loadBanners]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const startEdit = (banner: SiteBanner) => {
    setEditingId(banner.id);
    setForm({
      title: banner.title,
      message: banner.message,
      href: banner.href ?? "",
      ctaLabel: banner.ctaLabel ?? "",
      variant: banner.variant,
      enabled: banner.enabled,
      priority: banner.priority,
      startsAt: toDatetimeLocal(banner.startsAt),
      endsAt: toDatetimeLocal(banner.endsAt),
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const payload: SiteBannerInput = {
      title: form.title,
      message: form.message,
      href: form.href || null,
      ctaLabel: form.ctaLabel || null,
      variant: form.variant,
      enabled: form.enabled,
      priority: Number(form.priority ?? 0),
      startsAt: fromDatetimeLocal(String(form.startsAt ?? "")),
      endsAt: fromDatetimeLocal(String(form.endsAt ?? "")),
    };

    try {
      const response = await fetch(
        editingId ? `/api/admin/banners/${editingId}` : "/api/admin/banners",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to save banner.");
      }

      resetForm();
      await loadBanners();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save banner.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (banner: SiteBanner) => {
    if (!window.confirm(`Delete banner “${banner.title}”?`)) return;

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/banners/${banner.id}`, { method: "DELETE" });
      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to delete banner.");
      }

      if (editingId === banner.id) resetForm();
      await loadBanners();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete banner.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminTopBar
        title="Banners & Campaigns"
        description="Site-wide announcement bars shown on the public website (top of every page)."
        badge="Marketing"
      />

      <div className="flex-1 overflow-y-auto px-8 py-8">
        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-mono text-xs text-red-700">
            {error}
          </div>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <AdminCard padding="lg">
            <AdminPanelHeader
              title="Active & Scheduled Banners"
              description="Higher priority shows first. Disabled or out-of-schedule banners are hidden on the site."
              icon={<Megaphone className="h-5 w-5" />}
            />

            {loading ? (
              <p className="mt-4 font-mono text-xs text-black/45">Loading banners...</p>
            ) : banners.length === 0 ? (
              <p className="mt-4 font-mono text-xs text-black/45">No banners yet.</p>
            ) : (
              <ul className="mt-6 space-y-3">
                {banners.map((banner) => (
                  <li
                    key={banner.id}
                    className="rounded-2xl border border-black/[0.06] bg-[#fafafa] p-4"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-sans text-sm font-semibold text-black">{banner.title}</p>
                          <span className="rounded-full bg-black/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase">
                            {banner.variant}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase ${
                              banner.enabled
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-black/10 text-black/45"
                            }`}
                          >
                            {banner.enabled ? "Enabled" : "Disabled"}
                          </span>
                        </div>
                        <p className="mt-2 font-sans text-sm leading-relaxed text-black/70">
                          {banner.message}
                        </p>
                        <p className="mt-2 font-mono text-[10px] text-black/40">
                          Priority {banner.priority}
                          {banner.startsAt ? ` · starts ${new Date(banner.startsAt).toLocaleString()}` : ""}
                          {banner.endsAt ? ` · ends ${new Date(banner.endsAt).toLocaleString()}` : ""}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <AdminButton
                          type="button"
                          size="sm"
                          variant="secondary"
                          disabled={saving}
                          onClick={() => startEdit(banner)}
                        >
                          Edit
                        </AdminButton>
                        <button
                          type="button"
                          disabled={saving}
                          onClick={() => void handleDelete(banner)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 font-mono text-[11px] text-red-600 hover:bg-red-50 disabled:opacity-60"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </AdminCard>

          <AdminCard padding="lg">
            <AdminPanelHeader
              title={editingId ? "Edit Banner" : "Create Banner"}
              description="Keep copy short — one line works best on mobile."
              icon={<Plus className="h-5 w-5" />}
            />

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="font-mono text-[11px] text-black/50">Title</span>
                <input
                  required
                  value={form.title}
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                  className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 font-sans text-sm"
                />
              </label>

              <label className="block">
                <span className="font-mono text-[11px] text-black/50">Message</span>
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 font-sans text-sm"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-[11px] text-black/50">Link URL (optional)</span>
                  <input
                    value={form.href ?? ""}
                    onChange={(event) => setForm({ ...form, href: event.target.value })}
                    placeholder="https://app.numforlife.com/h5/"
                    className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 font-sans text-sm"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] text-black/50">Button label</span>
                  <input
                    value={form.ctaLabel ?? ""}
                    onChange={(event) => setForm({ ...form, ctaLabel: event.target.value })}
                    placeholder="了解更多"
                    className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 font-sans text-sm"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block">
                  <span className="font-mono text-[11px] text-black/50">Variant</span>
                  <select
                    value={form.variant}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        variant: event.target.value as SiteBannerInput["variant"],
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 font-sans text-sm"
                  >
                    {VARIANTS.map((variant) => (
                      <option key={variant.value} value={variant.value}>
                        {variant.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] text-black/50">Priority</span>
                  <input
                    type="number"
                    value={form.priority ?? 0}
                    onChange={(event) =>
                      setForm({ ...form, priority: Number(event.target.value) })
                    }
                    className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 font-sans text-sm"
                  />
                </label>
                <label className="flex items-end gap-2 pb-2">
                  <input
                    type="checkbox"
                    checked={form.enabled ?? true}
                    onChange={(event) => setForm({ ...form, enabled: event.target.checked })}
                  />
                  <span className="font-sans text-sm text-black/70">Enabled</span>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-[11px] text-black/50">Starts (optional)</span>
                  <input
                    type="datetime-local"
                    value={String(form.startsAt ?? "")}
                    onChange={(event) => setForm({ ...form, startsAt: event.target.value })}
                    className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 font-sans text-sm"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] text-black/50">Ends (optional)</span>
                  <input
                    type="datetime-local"
                    value={String(form.endsAt ?? "")}
                    onChange={(event) => setForm({ ...form, endsAt: event.target.value })}
                    className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 font-sans text-sm"
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <AdminButton type="submit" loading={saving}>
                  {editingId ? "Save changes" : "Create banner"}
                </AdminButton>
                {editingId ? (
                  <AdminButton type="button" variant="secondary" onClick={resetForm}>
                    Cancel edit
                  </AdminButton>
                ) : null}
              </div>
            </form>
          </AdminCard>
        </div>
      </div>
    </>
  );
}
