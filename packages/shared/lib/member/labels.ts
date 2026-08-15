import { CALCULATION_MODES, CALCULATOR_KINDS } from "@/lib/calculators/types";

const RECORDS_TYPE_LABELS: Record<number, string> = {
  [CALCULATOR_KINDS.numerology]: "数字生命",
  [CALCULATOR_KINDS.name]: "姓名学",
  [CALCULATOR_KINDS.tarot]: "塔罗",
  [CALCULATOR_KINDS.eastern]: "东方占卜",
};

const MODE_LABELS: Record<number, string> = {
  [CALCULATION_MODES.normal]: "普通",
  [CALCULATION_MODES.year]: "流年",
  [CALCULATION_MODES.month]: "流月",
  [CALCULATION_MODES.day]: "流日",
};

export function recordsTypeLabel(recordsType: number): string {
  return RECORDS_TYPE_LABELS[recordsType] ?? "测算";
}

export function calculationModeLabel(mode: number): string {
  return MODE_LABELS[mode] ?? "普通";
}

export function formatRecordLabel(input: {
  recordsType: number;
  mode: number;
  tarotType: string | null;
}): string {
  const base = recordsTypeLabel(input.recordsType);
  const mode = calculationModeLabel(input.mode);

  if (input.recordsType === CALCULATOR_KINDS.tarot && input.tarotType) {
    return `${base} · ${input.tarotType}`;
  }

  if (input.mode === CALCULATION_MODES.normal) {
    return base;
  }

  return `${base} · ${mode}`;
}

export function formatBirthDateParts(year: unknown, month: unknown, day: unknown): string | null {
  const y = Number(year);
  const m = Number(month);
  const d = Number(day);

  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) {
    return null;
  }

  if (y <= 0 || m <= 0 || d <= 0) return null;

  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}
