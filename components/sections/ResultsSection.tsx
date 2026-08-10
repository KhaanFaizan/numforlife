"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn, SectionHeading, SectionLabel } from "@/components/ui/FadeIn";
import { resultsImages } from "@/lib/content";

export function ResultsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#8e7b7e] py-16 md:py-24">
      {/* Decorative fluid shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={reducedMotion ? undefined : { x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#d47a9b]/40 blur-3xl"
        />
        <motion.div
          animate={reducedMotion ? undefined : { x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-[#d47a9b]/30 blur-3xl"
        />
        <motion.div
          animate={reducedMotion ? undefined : { x: [0, 15, 0], y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[#d47a9b]/25 blur-3xl"
        />
      </div>

      <div className="section-container relative z-10">
        <FadeIn className="text-center">
          <SectionLabel>指引</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-3 text-center">
          <SectionHeading>
            SEE RESULTS,
            <br />
            SEE REINVENTIONS
          </SectionHeading>
        </FadeIn>

        {/* Single split card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-5xl overflow-hidden shadow-2xl md:mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left — dice image */}
            <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[480px]">
              <Image
                src={resultsImages[0].src}
                alt={resultsImages[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Right — character grid image from reference */}
            <div className="relative aspect-square bg-surface md:aspect-auto md:min-h-[480px]">
              <Image
                src={resultsImages[1].src}
                alt={resultsImages[1].alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
