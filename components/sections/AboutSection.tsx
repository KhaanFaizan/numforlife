"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn, SectionLabel } from "@/components/ui/FadeIn";
import { aboutContent } from "@/lib/content";

export function AboutSection() {
  return (
    <section
      className="relative py-20 md:py-32"
      style={{
        backgroundImage: `url(${aboutContent.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center left",
      }}
    >
      <div className="absolute inset-0 bg-bg/60" />

      <div className="section-container relative z-10 text-center">
        <FadeIn>
          <SectionLabel>{aboutContent.label}</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.1} className="mx-auto mt-6 max-w-3xl">
          <p className="whitespace-pre-line font-mono text-sm leading-relaxed text-fg md:text-base">
            {aboutContent.text}
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-10">
          <Button href="/about-us">{aboutContent.cta}</Button>
        </FadeIn>
      </div>
    </section>
  );
}
