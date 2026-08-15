import type { ComponentType } from "react";
import type { CMSContent, HomepageBlockType } from "@/lib/cms/types";
import { Hero } from "@/components/sections/Hero";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { BrandTitle } from "@/components/sections/BrandTitle";
import { AppDownload } from "@/components/sections/AppDownload";
import { AboutSection } from "@/components/sections/AboutSection";
import { EcosystemSection } from "@/components/sections/EcosystemSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";

/**
 * Renders the homepage from the CMS block order.
 *
 * This is a SERVER component. It previously ran on the client and gated the
 * whole page behind a hydration check, which meant crawlers received an empty
 * skeleton — fatal for the SEO migration this project depends on. Content now
 * arrives as a prop resolved on the server, so the markup is complete in the
 * first response. Individual sections opt into the client only where they
 * genuinely need it (animation, form state).
 */

/** Blocks that render content from the CMS payload. */
const contentBlocks: Partial<
  Record<HomepageBlockType, ComponentType<{ content: CMSContent }>>
> = {
  hero: Hero,
  gallery: ImageGallery,
  features: EcosystemSection,
  footer: ContactSection,
};

/** Blocks whose content is still static. */
const staticBlocks: Partial<Record<HomepageBlockType, ComponentType>> = {
  brand: BrandTitle,
  "app-download": AppDownload,
  about: AboutSection,
  results: ResultsSection,
  partners: PartnersSection,
  testimonials: TestimonialsSection,
};

export function HomePageRenderer({
  content,
  showAppDownload = true,
}: {
  content: CMSContent;
  showAppDownload?: boolean;
}) {
  return (
    <>
      {content.homepageBlocks.map((block) => {
        if (block.type === "app-download" && !showAppDownload) {
          return null;
        }

        const ContentBlock = contentBlocks[block.type];
        if (ContentBlock) {
          return <ContentBlock key={block.id} content={content} />;
        }

        const StaticBlock = staticBlocks[block.type];
        // An unknown block type must not take the page down — a CMS editor
        // could publish a type this build does not know about.
        if (!StaticBlock) return null;

        return <StaticBlock key={block.id} />;
      })}
    </>
  );
}
