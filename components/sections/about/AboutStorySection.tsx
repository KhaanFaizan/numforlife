"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { aboutStory } from "@/lib/content";

export function AboutStorySection() {
  return (
    <section className="bg-bg px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-28">
      <FadeIn className="text-center">
        <p className="font-sans text-sm font-semibold text-fg md:text-base">
          {aboutStory.label}
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-8 text-center md:mt-10">
        {aboutStory.heading.map((line) => (
          <h1
            key={line}
            className="font-sans text-3xl leading-tight font-semibold tracking-wide text-fg md:text-5xl lg:text-[56px] lg:leading-[1.1]"
          >
            {line}
          </h1>
        ))}
      </FadeIn>

      <FadeIn delay={0.2} className="mx-auto mt-12 max-w-3xl space-y-8 md:mt-16 md:space-y-10">
        {aboutStory.paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 20)}
            className="text-center font-mono text-xs leading-relaxed text-fg md:text-sm md:leading-7"
          >
            {paragraph}
          </p>
        ))}
      </FadeIn>
    </section>
  );
}
