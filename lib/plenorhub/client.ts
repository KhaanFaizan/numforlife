import "server-only";

import type {
  PlenorHubListResponse,
  PlenorHubMerchantRaw,
  PlenorHubProductRaw,
} from "./types";

const DEFAULT_BASE_URL = "https://api.plenorhub.com/api/v1";

function getBaseUrl() {
  return process.env.PLENORHUB_BASE_URL ?? DEFAULT_BASE_URL;
}

function getChannelKey() {
  return process.env.PLENORHUB_CHANNEL_KEY?.trim() ?? "";
}

async function plenorhubFetch<T>(pathname: string): Promise<T | null> {
  const key = getChannelKey();
  if (!key) return null;

  const response = await fetch(`${getBaseUrl()}${pathname}`, {
    headers: {
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`PlenorHub ${pathname} returned HTTP ${response.status}`);
  }

  return (await response.json()) as T;
}

export function isPlenorHubConfigured() {
  return Boolean(getChannelKey());
}

export async function fetchPlenorHubProducts(): Promise<PlenorHubProductRaw[]> {
  const payload = await plenorhubFetch<PlenorHubListResponse<PlenorHubProductRaw>>(
    "/integration/products?per_page=100",
  );

  return payload?.data ?? [];
}

export async function fetchPlenorHubMerchants(): Promise<PlenorHubMerchantRaw[]> {
  const payload = await plenorhubFetch<PlenorHubListResponse<PlenorHubMerchantRaw>>(
    "/integration/merchants",
  );

  return payload?.data ?? [];
}

export async function fetchPlenorHubProduct(id: number): Promise<PlenorHubProductRaw | null> {
  try {
    const payload = await plenorhubFetch<
      { data?: PlenorHubProductRaw } | PlenorHubProductRaw
    >(`/integration/products/${id}`);

    if (!payload) return null;
    if ("data" in payload && payload.data) return payload.data;
    if ("id" in payload && typeof payload.id === "number") {
      return payload as PlenorHubProductRaw;
    }
  } catch {
    // Fall back to list lookup below.
  }

  const products = await fetchPlenorHubProducts();
  return products.find((product) => product.id === id) ?? null;
}
