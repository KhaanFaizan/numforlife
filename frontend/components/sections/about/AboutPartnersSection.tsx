"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { aboutPartnerLogos, aboutPartnersText } from "@/lib/content";

export function AboutPartnersSection() {
  return (
    <section className="bg-surface py-14 md:py-20 lg:py-28">
      <div className="section-container">
        <FadeIn className="text-center">
          <h2 className="section-heading-lg">Partners</h2>
        </FadeIn>

        <FadeIn delay={0.1} className="mx-auto mt-8 max-w-4xl md:mt-14">
          <p className="section-copy text-center">{aboutPartnersText}</p>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-10 md:mt-16">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-16 lg:gap-20">
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
                  className="h-auto max-h-[96px] w-auto object-contain sm:max-h-[120px]"
                />
              </Link>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
