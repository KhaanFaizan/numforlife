export function formatDisplayDate(value: string | null): string {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatDateTime(value: string | null): string {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function displayName(input: {
  nickname: string | null;
  email: string | null;
  name: string | null;
}): string {
  return input.nickname?.trim() || input.name?.trim() || input.email?.trim() || "会员";
}

export function membershipExpiryLabel(input: {
  isLifetime: boolean;
  subscriptionEnd: string | null;
}): string {
  if (input.isLifetime) return "终身有效";
  if (!input.subscriptionEnd) return "未开通付费会员";
  return `有效期至 ${formatDisplayDate(input.subscriptionEnd)}`;
}
