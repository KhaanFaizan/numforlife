"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ExternalLink,
  Layers3,
  Lock,
  RotateCcw,
  Save,
  Sparkles,
  Upload,
} from "lucide-react";
import {
  BlockEditor,
  getSelectedBlockType,
} from "@/components/admin/BlockEditor";
import {
  FeaturesBlockForm,
  FooterBlockForm,
  GalleryBlockForm,
  HeroBlockForm,
} from "@/components/admin/BlockForms";
import { VersionHistoryPanel } from "@/components/admin/VersionHistoryPanel";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { AdminCard, AdminPanelHeader } from "@/components/admin/ui/AdminCard";
import {
  AdminButton,
} from "@/components/admin/ui/AdminButton";
import { BLOCK_LABELS, EDITABLE_BLOCK_TYPES } from "@/lib/cms/types";
import { useCMS } from "@/lib/cms/content-provider";

export default function HomepageEditorPage() {
  const {
    draft,
    setDraft,
    saveDraft,
    publishDraft,
    discardDraft,
    resetToDefaults,
    hasUnpublishedChanges,
    isSaving,
    error,
  } = useCMS();
  const [selectedId, setSelectedId] = useState<string | null>(
    draft.homepageBlocks.find((block) => block.type === "hero")?.id ?? null,
  );
  const [draftSaved, setDraftSaved] = useState(false);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (!selectedId && draft.homepageBlocks[0]) {
      setSelectedId(draft.homepageBlocks[0].id);
    }
  }, [draft.homepageBlocks, selectedId]);

  const selectedType = useMemo(
    () => getSelectedBlockType(draft.homepageBlocks, selectedId),
    [draft.homepageBlocks, selectedId],
  );

  const handleSaveDraft = async () => {
    try {
      await saveDraft(draft);
      setDraftSaved(true);
      window.setTimeout(() => setDraftSaved(false), 2000);
    } catch {
      // Error surfaced via ContentProvider.
    }
  };

  const handlePublish = async () => {
    try {
      await publishDraft();
      setPublished(true);
      window.setTimeout(() => setPublished(false), 2000);
    } catch {
      // Error surfaced via ContentProvider.
    }
  };

  const renderForm = () => {
    if (!selectedType || !EDITABLE_BLOCK_TYPES.includes(selectedType)) {
      return (
        <AdminCard className="border-dashed bg-[#fafafa]/80 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-black/[0.04]">
            <Lock className="h-6 w-6 text-black/30" />
          </div>
          <p className="font-sans text-sm font-semibold text-black">
            Static section
          </p>
          <p className="mx-auto mt-2 max-w-sm font-mono text-xs leading-relaxed text-black/45">
            This block can be reordered on the homepage but its content is fixed
            in code for now.
          </p>
        </AdminCard>
      );
    }

    const props = { draft, onChange: setDraft };

    switch (selectedType) {
      case "hero":
        return <HeroBlockForm {...props} />;
      case "gallery":
        return <GalleryBlockForm {...props} />;
      case "features":
        return <FeaturesBlockForm {...props} />;
      case "footer":
        return <FooterBlockForm {...props} />;
      default:
        return null;
    }
  };

  return (
    <>
      <AdminTopBar
        title="Homepage Editor"
        description="Edit in draft, preview, then publish when ready"
        badge={hasUnpublishedChanges ? "Unpublished changes" : "Live matches draft"}
        actions={
          <>
            <AdminButton
              type="button"
              variant="secondary"
              disabled={isSaving}
              onClick={() => void discardDraft()}
            >
              Discard draft
            </AdminButton>
            <AdminButton
              type="button"
              variant="secondary"
              disabled={isSaving}
              onClick={() => void resetToDefaults()}
            >
              <RotateCcw className="h-4 w-4" />
              Reset defaults
            </AdminButton>
            <AdminButton
              type="button"
              variant="secondary"
              disabled={isSaving}
              onClick={async () => {
                try {
                  await saveDraft(draft);
                  window.open("/admin/preview", "_blank", "noopener,noreferrer");
                } catch {
                  // Error surfaced via ContentProvider.
                }
              }}
            >
              <ExternalLink className="h-4 w-4" />
              Preview draft
            </AdminButton>
            <AdminButton
              type="button"
              variant={draftSaved ? "accent" : "secondary"}
              loading={isSaving}
              onClick={handleSaveDraft}
            >
              {draftSaved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {draftSaved ? "Draft saved" : "Save draft"}
            </AdminButton>
            <AdminButton
              type="button"
              variant={published ? "accent" : "primary"}
              loading={isSaving}
              onClick={handlePublish}
            >
              {published ? <Check className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
              {published ? "Published!" : "Publish"}
            </AdminButton>
          </>
        }
      />

      {error ? (
        <div className="mx-8 mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid flex-1 gap-6 px-8 py-8 xl:grid-cols-[380px_minmax(0,1fr)] 2xl:grid-cols-[380px_minmax(0,1fr)_320px]">
        <AdminCard padding="none" className="overflow-hidden">
          <div className="border-b border-black/[0.05] bg-[#fafafa] px-6 py-5">
            <AdminPanelHeader
              title="Page Blocks"
              description="Drag to reorder homepage sections"
              icon={<Layers3 className="h-5 w-5" />}
            />
          </div>
          <div className="p-4">
            <BlockEditor
              blocks={draft.homepageBlocks}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onReorder={(blocks) =>
                setDraft({
                  ...draft,
                  homepageBlocks: blocks,
                })
              }
            />
          </div>
        </AdminCard>

        <AdminCard padding="none" className="overflow-hidden">
          <div className="border-b border-black/[0.05] bg-[#fafafa] px-6 py-5">
            <AdminPanelHeader
              title={selectedType ? BLOCK_LABELS[selectedType] : "Block Editor"}
              description="Edit the selected block content below"
              icon={<Sparkles className="h-5 w-5" />}
            />
          </div>
          <div className="p-6">{renderForm()}</div>
        </AdminCard>

        <div className="xl:col-span-2 2xl:col-span-1">
          <VersionHistoryPanel />
        </div>
      </div>

      <div className="px-8 pb-8">
        <p className="font-mono text-[11px] text-black/45">
          The public site at{" "}
          <Link href="/" target="_blank" className="underline">
            /
          </Link>{" "}
          shows published content only. Use Preview draft to review unpublished changes.
        </p>
      </div>
    </>
  );
}
