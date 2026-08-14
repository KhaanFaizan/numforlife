import type { BillingPeriodKey } from "./types";

export const BILLING_PERIODS: Array<{ key: BillingPeriodKey; label: string }> = [
  { key: "month", label: "月付" },
  { key: "year", label: "年付" },
  { key: "three_year", label: "三年" },
  { key: "five_year", label: "五年" },
  { key: "lifetime", label: "终身" },
];

export function trimLabel(value: string | null | undefined): string {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

export function parseMoney(value: unknown): number {
  if (value === null || value === undefined || value === "") return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatUsd(amount: number): string {
  if (amount <= 0) return "免费";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatGiftCoins(coins: number | null): string | null {
  if (coins === null || coins <= 0) return null;
  return `赠 ${coins} KCC Coin`;
}
