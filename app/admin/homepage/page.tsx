"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ExternalLink,
  Layers3,
  Lock,
  RotateCcw,
  Sparkles,
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
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { AdminCard, AdminPanelHeader } from "@/components/admin/ui/AdminCard";
import {
  AdminButton,
  AdminLinkButton,
} from "@/components/admin/ui/AdminButton";
import { BLOCK_LABELS, EDITABLE_BLOCK_TYPES } from "@/lib/cms/types";
import { useCMS } from "@/lib/cms/content-provider";

export default function HomepageEditorPage() {
  const { draft, setDraft, saveDraft, resetContent } = useCMS();
  const [selectedId, setSelectedId] = useState<string | null>(
    draft.homepageBlocks.find((block) => block.type === "hero")?.id ?? null,
  );
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!selectedId && draft.homepageBlocks[0]) {
      setSelectedId(draft.homepageBlocks[0].id);
    }
  }, [draft.homepageBlocks, selectedId]);

  const selectedType = useMemo(
    () => getSelectedBlockType(draft.homepageBlocks, selectedId),
    [draft.homepageBlocks, selectedId],
  );

  const handleSave = async () => {
    setSaving(true);
    saveDraft();
    await new Promise((resolve) => window.setTimeout(resolve, 400));
    setSaving(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
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
            in this demo.
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
        description="Drag blocks to reorder, edit content, then save to update the live site instantly"
        badge="Visual Editor"
        actions={
          <>
            <AdminButton type="button" variant="secondary" onClick={resetContent}>
              <RotateCcw className="h-4 w-4" />
              Reset
            </AdminButton>
            <AdminLinkButton href="/" target="_blank" variant="secondary">
              <ExternalLink className="h-4 w-4" />
              Preview
            </AdminLinkButton>
            <AdminButton
              type="button"
              variant={saved ? "accent" : "primary"}
              loading={saving}
              onClick={handleSave}
            >
              {saved ? <Check className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
              {saved ? "Saved!" : "Save Changes"}
            </AdminButton>
          </>
        }
      />

      <div className="grid flex-1 gap-6 px-8 py-8 xl:grid-cols-[380px_1fr]">
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
          <div className="p-6">
            {renderForm()}
          </div>
        </AdminCard>
      </div>
    </>
  );
}
