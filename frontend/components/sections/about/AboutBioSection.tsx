"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { aboutBio } from "@/lib/content";

export function AboutBioSection() {
  return (
    <section className="bg-bg py-12 md:py-16 lg:py-20">
      <div className="section-container">
        <FadeIn className="mx-auto max-w-3xl space-y-8 md:space-y-10">
          {aboutBio.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 20)}
              className="section-copy text-center"
            >
              {paragraph}
            </p>
          ))}
        </FadeIn>

        <FadeIn delay={0.15} className="mx-auto mt-10 max-w-5xl md:mt-20">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px]">
            <Image
              src={aboutBio.image}
              alt="Zodiac Clock Detail"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1024px"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
