/**
 * Server-side content source.
 *
 * Public pages call this during render so HTML ships fully populated and
 * crawlable. Content is read from the SQLite-backed CMS repository.
 */

import "server-only";

import { getPublishedContent as readPublishedContent } from "./repository";
import type { CMSContent } from "./types";

/** Content for the live, published site. */
export async function getPublishedContent(): Promise<CMSContent> {
  return readPublishedContent();
}
