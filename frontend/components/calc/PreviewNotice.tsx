import Link from "next/link";

/**
 * The preview-only disclaimer required by PRD 8.4.
 *
 * Wording is taken verbatim from the PRD so it matches the app's own messaging.
 * It is rendered on every result view — the boundary between the website preview
 * and the full app report is a product principle, not a nice-to-have.
 */
export function PreviewNotice({ className }: { className?: string }) {
  return (
    <aside
      className={`rounded-2xl border border-accent/30 bg-accent-soft px-5 py-4 ${className ?? ""}`}
    >
      <p className="font-sans text-sm leading-relaxed text-fg">
        此结果为简版预览。如需查看完整个人化解读，请前往数易 App。
      </p>
      <p className="mt-1 font-mono text-xs leading-relaxed text-fg-muted">
        This is a simplified preview. For a complete personalized interpretation,
        please continue in the Shuyi App.
      </p>
      <Link
        href="https://app.numforlife.com"
        className="focus-accent mt-3 inline-flex rounded-full bg-accent px-5 py-2 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
      >
        前往 App 查看完整解读
      </Link>
    </aside>
  );
}
