import Link from "next/link";

type SiteErrorViewProps = {
  code: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  onRetry?: () => void;
};

/** Shared layout for 404 and runtime error pages. */
export function SiteErrorView({
  code,
  title,
  description,
  primaryHref = "/",
  primaryLabel = "返回首页",
  onRetry,
}: SiteErrorViewProps) {
  return (
    <div className="page-shell flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-fg-subtle uppercase">{code}</p>
        <h1 className="cjk mt-4 font-sans text-3xl font-semibold text-fg md:text-4xl">{title}</h1>
        <p className="mt-4 font-sans text-sm leading-relaxed text-fg-muted md:text-base">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={primaryHref}
            className="focus-accent inline-flex min-h-[44px] items-center rounded-full bg-accent px-6 py-3 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
          >
            {primaryLabel}
          </Link>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="focus-accent inline-flex min-h-[44px] items-center rounded-full border border-border px-6 py-3 font-sans text-sm font-semibold text-fg transition-colors hover:border-accent"
            >
              重试
            </button>
          ) : null}
        </div>

        <nav aria-label="Helpful links" className="mt-10 border-t border-border pt-8">
          <p className="font-mono text-[11px] text-fg-subtle">您也可以前往</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-3 font-sans text-sm">
            <li>
              <Link href="/celue" className="focus-accent text-accent-ink hover:underline">
                测算
              </Link>
            </li>
            <li>
              <Link href="/faq" className="focus-accent text-accent-ink hover:underline">
                常见问题
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="focus-accent text-accent-ink hover:underline">
                联系我们
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
