"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type FadeType = "fadeInUp" | "fadeInLeft" | "fadeInRight" | "fadeIn";
type FadeDirection = "up" | "left" | "right" | "none";

type FadeInProps = {
  children: React.ReactNode;
  type?: FadeType;
  /** @deprecated Prefer `type`. Kept so existing homepage sections keep working. */
  direction?: FadeDirection;
  /** Seconds if ≤ 10 (legacy), otherwise milliseconds like Demo. */
  delay?: number;
  slow?: boolean;
  className?: string;
};

const DIRECTION_TO_TYPE: Record<FadeDirection, FadeType> = {
  up: "fadeInUp",
  left: "fadeInLeft",
  right: "fadeInRight",
  none: "fadeIn",
};

function delayMs(delay: number) {
  if (delay <= 0) return 0;
  return delay <= 10 ? delay * 1000 : delay;
}

export function FadeIn({
  children,
  type,
  direction = "up",
  delay = 0,
  slow = false,
  className = "",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const animation = type ?? DIRECTION_TO_TYPE[direction];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("anim", animation, slow && "slow", visible && "is-visible", className)}
      style={{ animationDelay: `${delayMs(delay)}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-sans text-sm font-semibold tracking-wide text-fg md:text-base",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-sans text-2xl font-semibold leading-tight md:text-[46px] md:leading-[1.1]",
        "text-fg",
        className,
      )}
    >
      {children}
    </h2>
  );
}
