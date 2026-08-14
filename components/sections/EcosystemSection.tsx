"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import type { CMSContent } from "@/lib/cms/types";
import type { FeatureItem } from "@/lib/cms/types";

const FEATURE_ICON_FALLBACKS: Record<string, string> = {
  "divination-1": "/icons/ecosystem/1.png",
  "divination-2": "/icons/ecosystem/2.png",
  knowledge: "/icons/ecosystem/3.png",
  tools: "/icons/ecosystem/4.png",
  archive: "/icons/ecosystem/5.png",
  mentor: "/icons/ecosystem/6.png",
};

function resolveIconSrc(feature: FeatureItem, index: number) {
  return (
    feature.icon?.trim() ||
    FEATURE_ICON_FALLBACKS[feature.id] ||
    `/icons/ecosystem/${index + 1}.png`
  );
}

function FeatureBlock({
  feature,
  index,
}: {
  feature: FeatureItem;
  index: number;
}) {
  const delay = 0.1 + index * 0.1;
  const iconSrc = resolveIconSrc(feature, index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: delay + 0.05,
        }}
        whileHover={{ scale: 1.08 }}
        className="mb-8 flex h-[84px] w-[90px] items-center justify-center md:mb-10 md:h-[97px] md:w-[103px]"
      >
        <Image
          key={iconSrc}
          src={iconSrc}
          alt={feature.title}
          width={103}
          height={97}
          className="h-auto w-full max-h-full object-contain drop-shadow-[0_12px_30px_rgba(255,255,255,0.12)]"
          style={{ width: "auto", height: "auto" }}
        />
      </motion.div>

      <h3 className="font-sans text-sm font-semibold text-fg md:text-base">
        {feature.title}
      </h3>
      <p className="mx-auto mt-4 max-w-[280px] font-mono text-xs leading-[26px] text-fg md:max-w-xs md:text-[12px]">
        {feature.description}
      </p>
    </motion.div>
  );
}

export function EcosystemSection({ content }: { content: CMSContent }) {
  

  return (
    <section id="ecosystem" className="bg-bg py-16 md:py-24 lg:py-28">
      <div className="section-container">
        <FadeIn className="text-center">
          <p className="section-eyebrow cjk">{content.features.sectionLabel}</p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-4 text-center md:mt-6">
          <h2 className="cjk section-heading-lg mx-auto max-w-4xl">
            {content.features.sectionHeading}
          </h2>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 md:mt-20 lg:grid-cols-3 lg:gap-x-[70px] lg:gap-y-20">
          {content.features.items.map((feature, i) => (
            <FeatureBlock key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
