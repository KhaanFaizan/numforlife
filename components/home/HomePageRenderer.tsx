"use client";

import type { HomepageBlockType } from "@/lib/cms/types";
import { useLiveCMS } from "@/lib/cms/content-provider";
import { PageLoadingSkeleton } from "@/components/ui/LoadingSkeleton";
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

const blockComponents: Record<HomepageBlockType, React.ComponentType> = {
  hero: Hero,
  gallery: ImageGallery,
  brand: BrandTitle,
  "app-download": AppDownload,
  about: AboutSection,
  features: EcosystemSection,
  results: ResultsSection,
  partners: PartnersSection,
  testimonials: TestimonialsSection,
  footer: ContactSection,
};

export function HomePageRenderer() {
  const { content, isHydrated } = useLiveCMS();

  if (!isHydrated) {
    return <PageLoadingSkeleton variant="dark" />;
  }

  return (
    <>
      {content.homepageBlocks.map((block) => {
        const Component = blockComponents[block.type];
        return <Component key={block.id} />;
      })}
    </>
  );
}
