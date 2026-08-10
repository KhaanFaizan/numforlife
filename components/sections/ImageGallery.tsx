"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { CMSContent } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.15,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-speed * 100, speed * 100]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[30px]",
        className,
      )}
    >
      <motion.div ref={ref} style={{ y }} className="h-full w-full">
        <div className="group relative h-full w-full overflow-hidden rounded-[30px]">
          <Image
            src={src}
            alt={alt}
            width={600}
            height={800}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-[30px] bg-bg/0 transition-colors duration-500 group-hover:bg-bg/10" />
        </div>
      </motion.div>
    </div>
  );
}

export function ImageGallery({ content }: { content: CMSContent }) {
  const images = content.gallery.images;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Left & right rise together as the section scrolls through the viewport.
  const sideY = useTransform(scrollYProgress, [0, 0.5, 1], [180, 0, -70]);

  if (images.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg py-8 md:py-12"
      aria-label="Product gallery"
    >
      <div className="section-container w-full">
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-3 md:gap-[70px]">
          {images.map((image, index) => {
            const isSide = index === 0 || index === 2;

            return (
              <motion.div
                key={image.id}
                style={isSide ? { y: sideY } : undefined}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={index === 1 ? "md:-mt-16" : "md:mt-0"}
              >
                <ParallaxImage
                  src={image.src}
                  alt={image.alt}
                  className={
                    image.tall
                      ? "min-h-[400px] md:min-h-[600px] lg:min-h-[800px]"
                      : "min-h-[300px] md:min-h-[400px]"
                  }
                  speed={isSide ? (index === 0 ? 0.2 : 0.18) : 0}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
