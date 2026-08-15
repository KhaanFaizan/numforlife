"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Copy, Trash2, Upload } from "lucide-react";

import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard, AdminPanelHeader } from "@/components/admin/ui/AdminCard";
import type { MediaAsset } from "@/lib/media/types";

const ACCEPT = "image/jpeg,image/png,image/webp,image/gif,image/avif";
const MAX_BYTES = 5 * 1024 * 1024;

function formatBytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaLibraryPanel() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadAlt, setUploadAlt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [altDrafts, setAltDrafts] = useState<Record<string, string>>({});

  const loadAssets = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/media", { cache: "no-store" });
      const body = (await response.json()) as {
        assets?: MediaAsset[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to load media library.");
      }

      const nextAssets = body.assets ?? [];
      setAssets(nextAssets);
      setAltDrafts(
        Object.fromEntries(nextAssets.map((asset) => [asset.id, asset.alt ?? ""])),
      );
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load media library.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAssets();
  }, [loadAssets]);

  const uploadFile = async (file: File) => {
    if (file.size > MAX_BYTES) {
      setError("File exceeds the 5 MB limit.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (uploadAlt.trim()) {
        formData.append("alt", uploadAlt.trim());
      }

      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Upload failed.");
      }

      setUploadAlt("");
      await loadAssets();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    await uploadFile(file);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    await uploadFile(file);
  };

  const saveAlt = async (asset: MediaAsset) => {
    const alt = altDrafts[asset.id] ?? "";
    setUploading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/media/${asset.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alt }),
      });

      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to save alt text.");
      }

      await loadAssets();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save alt text.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (asset: MediaAsset) => {
    if (!window.confirm(`Delete ${asset.filename}?`)) return;

    setUploading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/media/${asset.id}`, { method: "DELETE" });
      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Delete failed.");
      }

      await loadAssets();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Delete failed.");
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      window.setTimeout(() => setCopiedUrl(null), 1500);
    } catch {
      setError("Unable to copy URL to clipboard.");
    }
  };

  return (
    <>
      <AdminTopBar
        title="Media Library"
        description="Upload site-owned images to /media instead of hot-linking WordPress assets."
        badge="Assets"
      />

      <div className="flex-1 overflow-y-auto px-8 py-8">
        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-mono text-xs text-red-700">
            {error}
          </div>
        ) : null}

        <AdminCard padding="lg" className="mb-8">
          <AdminPanelHeader
            title="Upload Image"
            description="JPEG, PNG, WebP, GIF, or AVIF up to 5 MB. Recommended hero width 1600px+, gallery 800–1200px."
          />
          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="font-mono text-[11px] text-black/50">Alt text (recommended)</span>
              <input
                value={uploadAlt}
                onChange={(event) => setUploadAlt(event.target.value)}
                placeholder="Describe the image for accessibility and SEO"
                className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 font-sans text-sm"
              />
            </label>

            <div
              onDragOver={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(event) => void handleDrop(event)}
              className={`rounded-2xl border border-dashed px-6 py-10 text-center transition-colors ${
                dragActive
                  ? "border-accent bg-accent/5"
                  : "border-black/15 bg-[#fafafa]"
              }`}
            >
              <Upload className="mx-auto h-8 w-8 text-black/30" />
              <p className="mt-3 font-sans text-sm text-black/70">
                Drag and drop an image here, or choose a file
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPT}
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />
              <AdminButton
                type="button"
                className="mt-4"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? "Working..." : "Choose Image"}
              </AdminButton>
            </div>
          </div>
        </AdminCard>

        <AdminCard padding="lg">
          <AdminPanelHeader title="Library" description={`${assets.length} asset(s)`} />

          {loading ? (
            <p className="mt-4 font-mono text-xs text-black/45">Loading media...</p>
          ) : assets.length === 0 ? (
            <p className="mt-4 font-mono text-xs text-black/45">No uploads yet.</p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {assets.map((asset) => (
                <article
                  key={asset.id}
                  className="overflow-hidden rounded-2xl border border-black/[0.06] bg-[#fafafa]"
                >
                  <div className="relative aspect-[4/3] bg-black/[0.03]">
                    <Image
                      src={asset.url}
                      alt={asset.alt ?? asset.filename}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="space-y-3 p-4">
                    <div>
                      <p className="truncate font-mono text-xs text-black">{asset.filename}</p>
                      <p className="mt-1 font-mono text-[11px] text-black/45">
                        {formatBytes(asset.size)} · {asset.mime}
                      </p>
                    </div>

                    <label className="block">
                      <span className="font-mono text-[10px] text-black/45">Alt text</span>
                      <input
                        value={altDrafts[asset.id] ?? ""}
                        onChange={(event) =>
                          setAltDrafts((current) => ({
                            ...current,
                            [asset.id]: event.target.value,
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-black/10 px-2 py-1.5 font-sans text-xs"
                      />
                    </label>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void saveAlt(asset)}
                        disabled={uploading}
                        className="inline-flex items-center gap-1 rounded-lg border border-black/10 px-3 py-1.5 font-mono text-[11px] text-black/70 hover:bg-white disabled:opacity-60"
                      >
                        Save alt
                      </button>
                      <button
                        type="button"
                        onClick={() => void copyUrl(asset.url)}
                        className="inline-flex items-center gap-1 rounded-lg border border-black/10 px-3 py-1.5 font-mono text-[11px] text-black/70 hover:bg-white"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        {copiedUrl === asset.url ? "Copied" : "Copy URL"}
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(asset)}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 font-mono text-[11px] text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </AdminCard>
      </div>
    </>
  );
}
