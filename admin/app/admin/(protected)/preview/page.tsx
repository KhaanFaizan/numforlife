import type { Metadata } from "next";
import Link from "next/link";
import { HomePageRenderer } from "@/components/home/HomePageRenderer";
import { getPreviewContent } from "@/lib/cms/repository";

export const metadata: Metadata = {
  title: "Draft Preview – 数易 CMS",
  robots: { index: false, follow: false },
};

export default async function AdminPreviewPage() {
  const content = getPreviewContent();

  return (
    <div className="min-h-screen bg-bg">
      <div className="sticky top-0 z-[100] border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-3">
          <div>
            <p className="font-sans text-sm font-semibold text-fg">Draft preview</p>
            <p className="font-mono text-[11px] text-fg-subtle">
              Unpublished homepage content — not visible on the public site
            </p>
          </div>
          <Link
            href="/admin/homepage"
            className="focus-accent rounded-full border border-border px-4 py-2 font-sans text-sm text-fg transition-colors hover:border-accent"
          >
            Back to editor
          </Link>
        </div>
      </div>

      <HomePageRenderer content={content} />
    </div>
  );
}
