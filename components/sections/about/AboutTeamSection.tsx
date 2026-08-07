"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { aboutTeam } from "@/lib/content";

export function AboutTeamSection() {
  return (
    <section className="bg-[#f2f2f2] px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-28">
      <FadeIn className="text-center">
        <h2 className="font-sans text-2xl font-semibold text-black md:text-[46px] lg:text-[52px]">
          {aboutTeam.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-3xl font-sans text-sm leading-relaxed text-black md:text-base md:leading-7">
          {aboutTeam.subtitle}
        </p>
      </FadeIn>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-10">
        {aboutTeam.members.map((member, i) => (
          <FadeIn key={member.name} delay={i * 0.1}>
            <div className="overflow-hidden rounded-[4px] bg-white shadow-sm">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="bg-accent px-3 py-4 text-center">
                <p className="font-mono text-[11px] leading-snug font-medium text-black md:text-xs">
                  {member.name}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
