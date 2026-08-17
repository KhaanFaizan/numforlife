import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import type { CMSContent } from "@/lib/cms/types";

export function Hero({ content }: { content: CMSContent }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-[5%] pt-[10%] pb-[12%] text-white md:px-[2%]"
    >
      <div className="relative mx-auto w-full max-w-[1400px] text-center">
        <FadeIn delay={0.1}>
          <p className="hero-tagline">{content.hero.tagline}</p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="hero-headline mt-4 md:mt-5">
            {content.hero.titleLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h1>
        </FadeIn>

        <FadeIn delay={0.55} className="mt-8 md:mt-10">
          <Button href="#12" variant="reference">
            {content.hero.buttonText}
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
