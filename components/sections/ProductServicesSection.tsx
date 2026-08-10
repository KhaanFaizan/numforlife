"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { productServices } from "@/lib/content";

export function ProductServicesSection() {
  const rows = [
    productServices.slice(0, 2),
    productServices.slice(2, 4),
  ];

  return (
    <section className="bg-bg px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24 xl:px-24">
      <FadeIn className="text-center">
        <h1 className="font-sans text-3xl font-semibold text-fg md:text-[46px] lg:text-[52px]">
          Product Services
        </h1>
      </FadeIn>

      <div className="mx-auto mt-14 w-full max-w-[1100px] space-y-16 md:mt-20 md:space-y-20 lg:space-y-24">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 md:gap-10 lg:gap-14"
          >
            {row.map((service, i) => (
              <FadeIn key={service.id} delay={rowIndex * 0.1 + i * 0.08}>
                <Link href={service.href} className="group block text-center">
                  <h2 className="font-sans text-lg font-semibold text-fg md:text-xl lg:text-2xl">
                    {service.title}
                  </h2>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="relative mt-6 h-[400px] w-full overflow-hidden rounded-[30px] sm:h-[525px] md:mt-8"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
