"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { aboutStory } from "@/lib/content";

export function AboutStorySection() {
  return (
    <section className="bg-bg py-14 md:py-20 lg:py-28">
      <div className="section-container">
      <FadeIn className="text-center">
        <p className="section-eyebrow cjk">{aboutStory.label}</p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-8 text-center md:mt-10">
        {aboutStory.heading.map((line) => (
          <h1
            key={line}
            className="cjk font-sans text-[clamp(1.75rem,5vw,3.5rem)] leading-tight font-semibold tracking-wide text-fg lg:leading-[1.1]"
          >
            {line}
          </h1>
        ))}
      </FadeIn>

      <FadeIn delay={0.2} className="mx-auto mt-12 max-w-3xl space-y-8 md:mt-16 md:space-y-10">
        {aboutStory.paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 20)}
            className="section-copy text-center"
          >
            {paragraph}
          </p>
        ))}
      </FadeIn>
      </div>
    </section>
  );
}
