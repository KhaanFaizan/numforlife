export type MediaAsset = {
  id: string;
  filename: string;
  url: string;
  mime: string;
  size: number;
  alt: string | null;
  folder: string;
  uploadedBy: string;
  createdAt: string;
};

export type MediaUploadResult = MediaAsset;
