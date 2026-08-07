"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

export function BrandTitle() {
  return (
    <section className="bg-black pt-12 pb-6 md:pt-16 md:pb-8">
      <FadeIn className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-[40px] font-semibold text-white md:text-[80px] lg:text-[120px] lg:leading-none"
        >
          数易赋能
        </motion.h2>
      </FadeIn>
    </section>
  );
}
