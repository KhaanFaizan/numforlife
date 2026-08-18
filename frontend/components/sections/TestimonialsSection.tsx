"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { testimonials } from "@/lib/content";

function ArrowCircle({ dir }: { dir: "left" | "right" }) {
  if (dir === "left") {
    return (
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72-20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3 0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6 20.5-2.2 20.5-8.5v-67H140c-6.6 0-12 5.4-12 12z" />
    </svg>
  );
}

export function TestimonialsSection() {
  const slideRef = useRef(0);
  const [slide, setSlide] = useState(0);

  function goTo(next: number) {
    if (next === slideRef.current) return;
    slideRef.current = next;
    setSlide(next);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((slideRef.current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="feed">
      <FadeIn>
        <p className="section-eyebrow">合作伙伴</p>
      </FadeIn>
      <FadeIn>
        <h2 className="section-title">STRAIGHT FROM THE FEED</h2>
      </FadeIn>
      <FadeIn className="carousel">
        <div className="carousel-stage">
          {testimonials.map((item, index) => (
            <div
              key={item.author}
              className={`carousel-panel${index === slide ? " is-active" : ""}`}
              aria-hidden={index !== slide}
            >
              <p className="carousel-quote">{item.quote}</p>
              <h2 className="carousel-name">{item.author}</h2>
            </div>
          ))}
          <div className="carousel-nav">
            <button
              type="button"
              aria-label="Previous"
              onClick={() =>
                goTo((slide - 1 + testimonials.length) % testimonials.length)
              }
            >
              <ArrowCircle dir="left" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => goTo((slide + 1) % testimonials.length)}
            >
              <ArrowCircle dir="right" />
            </button>
          </div>
        </div>
        <div className="carousel-dots">
          {testimonials.map((item, index) => (
            <button
              key={item.author}
              type="button"
              className={index === slide ? "active" : ""}
              aria-label={`Slide ${index + 1}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
