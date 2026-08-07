export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const motionDurations = {
  fast: 0.35,
  normal: 0.6,
  slow: 0.8,
} as const;

export function getReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
