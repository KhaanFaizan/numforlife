"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn, SectionHeading, SectionLabel } from "@/components/ui/FadeIn";
import { testimonials } from "@/lib/content";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

function CircleArrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label={direction === "left" ? "上一条" : "下一条"}
      onClick={onClick}
      whileHover={reducedMotion ? undefined : { scale: 1.06 }}
      whileTap={reducedMotion ? undefined : { scale: 0.95 }}
      className="focus-accent-light flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/30 text-black transition-colors hover:border-accent-hover hover:text-accent-hover"
    >
      {direction === "left" ? (
        <ChevronLeft size={18} strokeWidth={1.5} />
      ) : (
        <ChevronRight size={18} strokeWidth={1.5} />
      )}
    </motion.button>
  );
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const reducedMotion = useReducedMotion();

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrent(
      (prev) =>
        (prev + newDirection + testimonials.length) % testimonials.length,
    );
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate, reducedMotion]);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="section-container">
        <FadeIn className="text-center">
          <SectionLabel className="!text-black">合作伙伴</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-3 text-center">
          <SectionHeading dark>STRAIGHT FROM THE FEED</SectionHeading>
        </FadeIn>

        <div className="relative mx-auto mt-14 max-w-3xl md:mt-16">
          <div className="flex items-center gap-4 md:gap-8">
            <CircleArrow direction="left" onClick={() => paginate(-1)} />

            <div
              className="relative min-h-[160px] flex-1 overflow-hidden md:min-h-[140px]"
              aria-live="polite"
              aria-atomic="true"
            >
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  initial={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: direction >= 0 ? 60 : -60 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: direction >= 0 ? -60 : 60 }
                  }
                  transition={{ duration: 0.4, ease: easeOutExpo }}
                  className="text-center"
                >
                  <p className="font-mono text-xs leading-5 text-black md:text-sm md:leading-6">
                    {testimonials[current].quote}
                  </p>
                  <h3 className="mt-5 font-sans text-sm font-semibold text-black md:text-base">
                    {testimonials[current].author}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>

            <CircleArrow direction="right" onClick={() => paginate(1)} />
          </div>

          <div className="mt-10 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`第 ${i + 1} 条评价`}
                aria-current={i === current ? "true" : undefined}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={cn(
                  "focus-accent-light h-2 w-2 rounded-full transition-all duration-300",
                  i === current ? "scale-125 bg-black" : "bg-black/20 hover:bg-black/40",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
