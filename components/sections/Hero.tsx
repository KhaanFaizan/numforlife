import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import type { CMSContent } from "@/lib/cms/types";

export function Hero({ content }: { content: CMSContent }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-bg pb-12 pt-24 sm:pb-16 sm:pt-28 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,193,7,0.08),transparent_55%)]" />

      <div className="section-container relative w-full max-w-[900px] text-center">
        <FadeIn delay={0.1}>
          <p className="section-eyebrow cjk">{content.hero.tagline}</p>
        </FadeIn>

        <div className="mt-6 space-y-1 sm:mt-8 md:mt-10">
          {content.hero.titleLines.map((line, i) => (
            <FadeIn key={`${line}-${i}`} delay={0.2 + i * 0.08}>
              <h1 className="cjk font-sans text-[clamp(1.5rem,5.5vw,2.8125rem)] leading-[1.25] font-semibold text-fg md:leading-[50px]">
                {line}
              </h1>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.55} className="mt-8 sm:mt-10 md:mt-12">
          <Button href="#ecosystem">{content.hero.buttonText}</Button>
        </FadeIn>
      </div>
    </section>
  );
}
