"use client";

import { useEffect, useRef } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { aboutContent } from "@/lib/content";

function motionY(el: HTMLElement, speed: number) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const progress = (vh - rect.top) / (vh + rect.height);
  const p = Math.min(1, Math.max(0, progress));
  return Math.max(0, (p - 0.5) * speed * 80);
}

const aboutParagraphs = aboutContent.text
  .split(/\n\s*\n/)
  .map((paragraph) => paragraph.trim())
  .filter(Boolean);

export function AboutSection() {
  const aboutBg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (aboutBg.current) {
        aboutBg.current.style.transform = `translate3d(0, ${motionY(aboutBg.current, 6.1).toFixed(2)}px, 0)`;
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

  return (
    <section className="about-home" id="12">
      <div
        className="about-home-bg"
        ref={aboutBg}
        style={{ backgroundImage: `url(${aboutContent.bgImage})` }}
      />
      <div className="about-home-inner">
        <FadeIn>
          <h2>{aboutContent.label}</h2>
        </FadeIn>
        <FadeIn className="about-home-body">
          {aboutParagraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph.split("\n").map((line, lineIndex) => (
                <span key={`${index}-${lineIndex}`}>
                  {lineIndex > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </p>
          ))}
        </FadeIn>
        <FadeIn>
          <Button href="/about-us">{aboutContent.cta}</Button>
        </FadeIn>
      </div>
    </section>
  );
}
