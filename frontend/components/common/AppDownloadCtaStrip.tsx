import Link from "next/link";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_EXPERIENCE_URL?.trim() || "https://app.numforlife.com/h5/";

type Props = {
  title?: string;
  description?: string;
  className?: string;
};

/** Compact App download CTA used on shop and membership pages. */
export function AppDownloadCtaStrip({
  title = "在 App 获得完整体验",
  description = "下载数易 App，解锁完整测算解读、记录保存与会员管理。",
  className = "",
}: Props) {
  return (
    <section className={`border-t border-border bg-bg-subtle ${className}`.trim()}>
      <div className="section-container flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center md:py-16">
        <div className="max-w-2xl">
          <h2 className="cjk font-sans text-2xl font-semibold text-fg md:text-3xl">{title}</h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-fg-muted md:text-base">
            {description}
          </p>
        </div>
        <Link
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-accent inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-accent px-8 py-3 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
        >
          打开数易 App
        </Link>
      </div>
    </section>
  );
}
