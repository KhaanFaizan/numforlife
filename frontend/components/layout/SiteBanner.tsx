import Link from "next/link";
import type { SiteBanner } from "@/lib/banners/types";

const VARIANT_STYLES: Record<SiteBanner["variant"], string> = {
  info: "border-border bg-accent-soft text-fg",
  promo: "border-accent/30 bg-accent text-accent-fg",
  warning: "border-amber-300 bg-amber-50 text-amber-950",
};

type Props = {
  banners: SiteBanner[];
};

/** Site-wide announcement bar rendered below the fixed header offset. */
export function SiteBannerStack({ banners }: Props) {
  if (banners.length === 0) return null;

  return (
    <div className="border-b border-border bg-bg-subtle">
      <div className="section-container space-y-2 py-3">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`flex flex-col gap-3 rounded-2xl border px-4 py-3 md:flex-row md:items-center md:justify-between ${VARIANT_STYLES[banner.variant]}`}
          >
            <div>
              <p className="font-sans text-sm font-semibold">{banner.title}</p>
              <p className="mt-1 font-sans text-sm leading-relaxed opacity-90">{banner.message}</p>
            </div>
            {banner.href ? (
              <Link
                href={banner.href}
                className="focus-accent inline-flex shrink-0 rounded-full border border-current/20 px-4 py-2 font-sans text-sm font-semibold transition-opacity hover:opacity-80"
              >
                {banner.ctaLabel || "了解更多"}
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
