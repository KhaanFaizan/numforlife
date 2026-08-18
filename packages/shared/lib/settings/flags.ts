export type SiteFlagKey =
  | "maintenance_mode"
  | "shop_enabled"
  | "membership_page_enabled"
  | "show_app_download_cta";

export type SiteFlagDefinition = {
  key: SiteFlagKey;
  label: string;
  description: string;
  defaultValue: boolean;
};

export type SiteFlags = Record<SiteFlagKey, boolean>;

export const SITE_FLAG_DEFINITIONS: SiteFlagDefinition[] = [
  {
    key: "maintenance_mode",
    label: "Maintenance mode",
    description: "When enabled, show a maintenance notice on public pages (server-rendered).",
    defaultValue: false,
  },
  {
    key: "shop_enabled",
    label: "Shop enabled",
    description: "Controls whether /shopping is linked prominently in navigation.",
    defaultValue: true,
  },
  {
    key: "membership_page_enabled",
    label: "Membership page enabled",
    description: "Allows public access to /membership pricing and benefits.",
    defaultValue: true,
  },
  {
    key: "show_app_download_cta",
    label: "App download CTAs",
    description:
      "Shows App download prompts on the homepage, shop, and membership pages.",
    defaultValue: true,
  },
];

export const DEFAULT_SITE_FLAGS: SiteFlags = Object.fromEntries(
  SITE_FLAG_DEFINITIONS.map((flag) => [flag.key, flag.defaultValue]),
) as SiteFlags;
