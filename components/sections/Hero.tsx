"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { useLiveCMS } from "@/lib/cms/content-provider";

export function Hero() {
  const { content } = useLiveCMS();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 pt-20 pb-16 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,193,7,0.08),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-[900px] text-center">
        <FadeIn delay={0.1}>
          <p className="font-sans text-sm font-semibold text-white md:text-base">
            {content.hero.tagline}
          </p>
        </FadeIn>

        <div className="mt-8 md:mt-10">
          {content.hero.titleLines.map((line, i) => (
            <FadeIn key={`${line}-${i}`} delay={0.2 + i * 0.08}>
              <h1 className="font-sans text-[28px] leading-tight font-semibold text-white md:text-[45px] md:leading-[50px]">
                {line}
              </h1>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.55} className="mt-10 md:mt-12">
          <Button href="#ecosystem">{content.hero.buttonText}</Button>
        </FadeIn>
      </div>
    </section>
  );
}
