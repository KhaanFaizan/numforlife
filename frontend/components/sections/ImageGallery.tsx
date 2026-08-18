"use client";

import { useEffect, useRef } from "react";
import type { CMSContent } from "@/lib/cms/types";

function phoneMotionY(el: HTMLElement, speed: number) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const progress = (vh - rect.top) / (vh + rect.height);
  const p = Math.min(1, Math.max(0, progress));
  return -p * speed * 80;
}

export function ImageGallery({ content }: { content: CMSContent }) {
  const images = content.gallery.images;
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (window.innerWidth > 767) {
        if (leftRef.current) {
          leftRef.current.style.transform = `translate3d(0, ${phoneMotionY(leftRef.current, 4).toFixed(2)}px, 0)`;
        }
        if (rightRef.current) {
          rightRef.current.style.transform = `translate3d(0, ${phoneMotionY(rightRef.current, 4).toFixed(2)}px, 0)`;
        }
      } else {
        if (leftRef.current) leftRef.current.style.transform = "";
        if (rightRef.current) rightRef.current.style.transform = "";
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (images.length === 0) return null;

  return (
    <section className="phones" aria-label="Product gallery">
      <div className="phones-row">
        {images.map((image, index) => {
          const isFirst = index === 0;
          const isLast = index === images.length - 1 && images.length > 1;
          const isSide = images.length >= 3 && (isFirst || isLast);
          const colClass = isSide ? "phone-col phone-col-side" : "phone-col phone-col-mid";
          const ref = isFirst ? leftRef : isLast ? rightRef : undefined;

          return (
            <div key={image.id} className={colClass} ref={ref}>
              <img src={image.src} alt={image.alt} width={isSide ? 481 : 750} height={isSide ? 1001 : 1388} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
