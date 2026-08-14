"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn, SectionHeading, SectionLabel } from "@/components/ui/FadeIn";
import { partners } from "@/lib/content";

export function PartnersSection() {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="section-container text-center">
        <FadeIn>
          <SectionLabel>合作伙伴</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-4">
          <SectionHeading>PROUD TO WORK WITH</SectionHeading>
        </FadeIn>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-10 md:mt-16 md:gap-16">
          {partners.map((partner, i) => (
            <motion.a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="block"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={300}
                height={300}
                className={`h-auto object-contain ${
                  i === 0
                    ? "max-h-[180px] w-[180px] rounded-full"
                    : "max-h-[100px] w-auto bg-white px-6 py-3"
                }`}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
