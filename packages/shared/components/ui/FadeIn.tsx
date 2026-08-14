"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

type FadeInProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
};

const directionMap = {
  up: { y: 40, x: 0 },
  left: { y: 0, x: -50 },
  right: { y: 0, x: 50 },
  none: { y: 0, x: 0 },
};

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  ...props
}: FadeInProps) {
  const reducedMotion = useReducedMotion();
  const offset = directionMap[direction];

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: easeOutExpo,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
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
  // The old `dark` prop chose black-on-white vs white-on-black. Now that panels
  // use surface tokens, `text-fg` is correct against every background in both
  // themes, so the distinction no longer exists.
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
