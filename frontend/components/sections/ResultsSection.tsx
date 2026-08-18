"use client";

import { useEffect, useRef } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { resultsImages } from "@/lib/content";

const RESULTS_BG =
  "https://numforlife.com/wp-content/uploads/2025/06/bg3-2.jpg";

export function ResultsSection() {
  const resultsTilt = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = resultsTilt.current;
    if (!el) return;
    const onMove = (event: MouseEvent) => {
      if (window.innerWidth < 768) {
        el.style.transform = "";
        return;
      }
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (event.clientX - cx) / cx;
      const dy = (event.clientY - cy) / cy;
      const speed = 0.9;
      el.style.transform = `perspective(1200px) rotateX(${(-dy * speed * 6).toFixed(3)}deg) rotateY(${(dx * speed * 6).toFixed(3)}deg)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="results">
      <div
        className="results-bg"
        style={{ backgroundImage: `url(${RESULTS_BG})` }}
      />
      <div className="results-inner">
        <FadeIn>
          <p className="section-eyebrow">指引</p>
        </FadeIn>
        <FadeIn>
          <h2 className="section-title">
            SEE RESULTS,
            <br />
            SEE REINVENTIONS
          </h2>
        </FadeIn>
        <FadeIn>
          <div className="results-images" ref={resultsTilt}>
            {resultsImages.map((image) => (
              <img key={image.src} src={image.src} alt={image.alt} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
