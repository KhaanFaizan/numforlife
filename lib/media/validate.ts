const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

export const MAX_MEDIA_BYTES = 5 * 1024 * 1024;

export function validateMediaFile(file: File) {
  if (!ALLOWED_MIME.has(file.type)) {
    throw new Error("Only JPEG, PNG, WebP, GIF, and AVIF images are allowed.");
  }

  if (file.size <= 0) {
    throw new Error("File is empty.");
  }

  if (file.size > MAX_MEDIA_BYTES) {
    throw new Error("File exceeds the 5 MB upload limit.");
  }
}

export function sanitiseFilename(name: string) {
  const base = name.trim().replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-");
  return base.replace(/^-+|-+$/g, "").slice(0, 120) || "upload";
}
