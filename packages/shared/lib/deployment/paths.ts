import path from "node:path";

/** SQLite CMS database — shared by admin (write) and frontend (read published). */
export function cmsDatabasePath(): string {
  return (
    process.env.CMS_DATABASE_PATH?.trim() ||
    path.join(process.cwd(), "data", "numforlife_web.sqlite")
  );
}

/** Legacy redirect manifest consumed by the public site proxy. */
export function redirectsManifestPath(): string {
  return (
    process.env.REDIRECTS_MANIFEST_PATH?.trim() ||
    path.join(process.cwd(), "public", "redirects.manifest.json")
  );
}

/** Optional second write target so admin publish updates the frontend static copy on UAT. */
export function redirectsManifestPublicCopyPath(): string | null {
  const value = process.env.REDIRECTS_MANIFEST_PUBLIC_COPY?.trim();
  return value || null;
}

/** Uploaded media files — shared between admin uploads and public /media/ serving. */
export function mediaRootPath(): string {
  return (
    process.env.MEDIA_ROOT?.trim() ||
    path.join(process.cwd(), "public", "media")
  );
}
