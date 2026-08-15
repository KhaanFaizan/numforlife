export type BannerVariant = "info" | "promo" | "warning";

export type SiteBanner = {
  id: string;
  title: string;
  message: string;
  href: string | null;
  ctaLabel: string | null;
  variant: BannerVariant;
  enabled: boolean;
  priority: number;
  startsAt: string | null;
  endsAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SiteBannerInput = {
  title: string;
  message: string;
  href?: string | null;
  ctaLabel?: string | null;
  variant?: BannerVariant;
  enabled?: boolean;
  priority?: number;
  startsAt?: string | null;
  endsAt?: string | null;
};
