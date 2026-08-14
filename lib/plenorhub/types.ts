export type PlenorHubListMeta = {
  total?: number;
  channel?: string;
  current_page?: number;
  per_page?: number;
};

export type PlenorHubListResponse<T> = {
  data: T[];
  meta?: PlenorHubListMeta;
};

export type PlenorHubProductRaw = {
  id: number;
  name?: string;
  title?: string;
  description?: string | null;
  short_description?: string | null;
  price?: string | number;
  currency?: string;
  stock?: number | null;
  quantity?: number | null;
  in_stock?: boolean;
  category?: string | null;
  category_id?: number | null;
  image?: string | null;
  image_url?: string | null;
  thumbnail?: string | null;
  cover_image?: string | null;
  images?: Array<string | { url?: string | null }>;
  merchant_id?: number | null;
  merchant?: {
    id?: number;
    name?: string;
    logo?: string | null;
    logo_url?: string | null;
  } | null;
};

export type PlenorHubMerchantRaw = {
  id: number;
  name?: string;
  logo?: string | null;
  logo_url?: string | null;
};
