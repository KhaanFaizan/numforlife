"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { aboutPartnerLogos, aboutPartnersText } from "@/lib/content";

export function AboutPartnersSection() {
  return (
    <section className="bg-white px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-28">
      <FadeIn className="text-center">
        <h2 className="font-sans text-2xl font-semibold text-black md:text-[46px] lg:text-[52px]">
          Partners
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} className="mx-auto mt-10 max-w-4xl md:mt-14">
        <p className="text-center font-mono text-xs leading-relaxed text-black md:text-sm md:leading-7">
          {aboutPartnersText}
        </p>
      </FadeIn>

      <FadeIn delay={0.2} className="mt-14 md:mt-16">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20">
          {aboutPartnerLogos.map((partner) => (
            <Link
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-opacity hover:opacity-80"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={150}
                height={150}
                className="h-auto max-h-[120px] w-auto object-contain"
              />
            </Link>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
