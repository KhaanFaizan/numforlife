import type { CMSContent } from "./types";

/** Minimal structural guard before persisting editor JSON. */
export function isValidCMSContent(value: unknown): value is CMSContent {
  if (!value || typeof value !== "object") return false;

  const content = value as Partial<CMSContent>;

  return (
    typeof content.hero === "object" &&
    content.hero !== null &&
    Array.isArray(content.hero?.titleLines) &&
    typeof content.gallery === "object" &&
    content.gallery !== null &&
    Array.isArray(content.gallery?.images) &&
    typeof content.features === "object" &&
    content.features !== null &&
    Array.isArray(content.features?.items) &&
    typeof content.footer === "object" &&
    content.footer !== null &&
    Array.isArray(content.footer?.links) &&
    Array.isArray(content.homepageBlocks) &&
    Array.isArray(content.pages)
  );
}
