/**
 * Server-side content source.
 *
 * This is the seam between the pages and wherever content actually lives. Today
 * it returns the seeded defaults; when CMS persistence lands it will read the
 * published version from the database. Because every page goes through here,
 * that swap touches this file only — no page or section changes.
 *
 * Deliberately server-only: pages call this during render so the HTML ships
 * fully populated and crawlable. The client-side ContentProvider remains, but
 * only the admin editor uses it now (for live draft preview).
 */

import { defaultCMSContent } from "./defaults";
import type { CMSContent } from "./types";

/**
 * Content for the live, published site.
 *
 * Async from the outset so introducing a database call later does not change
 * a single call site.
 */
export async function getPublishedContent(): Promise<CMSContent> {
  // TODO(cms-persistence): read the published version from `numforlife_web`,
  // falling back to these defaults when no row exists yet.
  return defaultCMSContent;
}
