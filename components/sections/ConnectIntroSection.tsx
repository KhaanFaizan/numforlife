"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { connectIntro } from "@/lib/connect";

export function ConnectIntroSection() {
  return (
    <section className="flex min-h-[calc(100svh-72px)] flex-col items-center justify-center bg-bg py-16 text-center sm:py-20 md:min-h-[calc(100svh-80px)] md:py-32 lg:py-40">
      <div className="section-container">
        <FadeIn>
          <h1 className="cjk font-sans text-[clamp(2rem,8vw,3.75rem)] font-normal leading-[1.08] text-fg">
            {connectIntro.headingLines[0]}
            <br />
            {connectIntro.headingLines[1]}
          </h1>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-8 sm:mt-12 md:mt-16">
          <p className="section-copy mx-auto max-w-xl md:text-[15px] lg:max-w-none lg:whitespace-nowrap">
            {connectIntro.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-8 sm:mt-12 md:mt-16">
          <div className="font-sans text-base font-bold leading-snug text-fg md:text-lg">
            {connectIntro.contactLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
