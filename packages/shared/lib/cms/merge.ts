import { defaultCMSContent } from "./defaults";
import type { CMSContent } from "./types";

const LEGACY_FOOTER_COPYRIGHT = "© 2035 by 数码麒麟";

function resolveFooterCopyright(copyright?: string) {
  const trimmed = copyright?.trim();
  if (!trimmed || trimmed === LEGACY_FOOTER_COPYRIGHT) {
    return defaultCMSContent.footer.copyright;
  }

  return trimmed;
}

const defaultFeatureIcons = Object.fromEntries(
  defaultCMSContent.features.items.map((item) => [item.id, item.icon]),
);

function resolveFeatureIcon(
  item: CMSContent["features"]["items"][number],
  index: number,
) {
  const fallbackById = defaultFeatureIcons[item.id];
  const fallbackByIndex = defaultCMSContent.features.items[index]?.icon;
  const icon =
    item.icon?.trim() ||
    fallbackById ||
    fallbackByIndex ||
    `/icons/ecosystem/${index + 1}.png`;

  return icon;
}

/** Merge stored CMS JSON with seeded defaults so partial saves stay valid. */
export function mergeWithDefaults(stored: Partial<CMSContent>): CMSContent {
  return {
    ...defaultCMSContent,
    ...stored,
    hero: { ...defaultCMSContent.hero, ...stored.hero },
    gallery: {
      ...defaultCMSContent.gallery,
      ...stored.gallery,
      images: stored.gallery?.images ?? defaultCMSContent.gallery.images,
    },
    features: {
      ...defaultCMSContent.features,
      ...stored.features,
      items:
        stored.features?.items?.map((item, index) => ({
          ...defaultCMSContent.features.items[index],
          ...item,
          icon: resolveFeatureIcon(item, index),
        })) ?? defaultCMSContent.features.items,
    },
    footer: {
      ...defaultCMSContent.footer,
      ...stored.footer,
      links: stored.footer?.links ?? defaultCMSContent.footer.links,
      copyright: resolveFooterCopyright(stored.footer?.copyright),
    },
    homepageBlocks: (
      stored.homepageBlocks ?? defaultCMSContent.homepageBlocks
    ).filter((block) => (block.type as string) !== "faq"),
    pages: stored.pages ?? defaultCMSContent.pages,
  };
}
