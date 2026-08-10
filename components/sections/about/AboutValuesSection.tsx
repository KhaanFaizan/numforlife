"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { aboutValues } from "@/lib/content";

export function AboutValuesSection() {
  return (
    <section className="bg-bg px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-28">
      <FadeIn className="text-center">
        <h2 className="font-sans text-2xl font-semibold text-fg md:text-[46px] lg:text-[52px]">
          Our Values and Mission
        </h2>
      </FadeIn>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
        {aboutValues.map((value, i) => (
          <FadeIn key={value.title} delay={i * 0.06}>
            <div className="text-center">
              <h3 className="mx-auto inline-block bg-accent px-2 py-1 font-sans text-xs font-semibold text-accent-fg md:text-sm">
                {value.title}
              </h3>
              <p className="mt-5 font-mono text-xs leading-[26px] text-fg md:text-[12px]">
                {value.text}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
