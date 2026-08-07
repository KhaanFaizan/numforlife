"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { connectIntro } from "@/lib/connect";

export function ConnectIntroSection() {
  return (
    <section className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center bg-black px-6 py-24 text-center md:min-h-[calc(100vh-80px)] md:px-12 md:py-32 lg:py-40">
      <FadeIn>
        <h1 className="font-sans text-[44px] font-normal leading-[1.08] text-white md:text-[56px] lg:text-[60px]">
          {connectIntro.headingLines[0]}
          <br />
          {connectIntro.headingLines[1]}
        </h1>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-12 md:mt-16">
        <p className="font-mono text-sm leading-normal tracking-tight text-white md:text-[15px] lg:whitespace-nowrap">
          {connectIntro.description}
        </p>
      </FadeIn>

      <FadeIn delay={0.2} className="mt-12 md:mt-16">
        <div className="font-sans text-base font-bold leading-snug text-white md:text-lg">
          {connectIntro.contactLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
