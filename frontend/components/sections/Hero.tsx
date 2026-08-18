import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import type { CMSContent } from "@/lib/cms/types";

export function Hero({ content }: { content: CMSContent }) {
  return (
    <section id="hero" className="hero">
      <FadeIn type="fadeInUp" delay={100}>
        <p className="hero-eyebrow">{content.hero.tagline}</p>
      </FadeIn>

      <FadeIn type="fadeInUp" delay={400} slow className="hero-title-wrap">
        <h1 className="hero-title" lang="en">
          {content.hero.titleLines.join(" ")}
        </h1>
      </FadeIn>

      <FadeIn type="fadeInUp" delay={1000} slow>
        <Button href="#12">{content.hero.buttonText}</Button>
      </FadeIn>
    </section>
  );
}
