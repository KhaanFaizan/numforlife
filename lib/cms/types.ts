export type HomepageBlockType =
  | "hero"
  | "gallery"
  | "brand"
  | "app-download"
  | "about"
  | "features"
  | "results"
  | "partners"
  | "testimonials"
  | "footer";

export type HomepageBlock = {
  id: string;
  type: HomepageBlockType;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  tall: boolean;
};

export type FeatureItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type SitePage = {
  id: string;
  title: string;
  slug: string;
  status: "published" | "draft";
  lastUpdated: string;
};

export type CMSContent = {
  hero: {
    tagline: string;
    titleLines: string[];
    buttonText: string;
  };
  gallery: {
    images: GalleryImage[];
  };
  features: {
    sectionLabel: string;
    sectionHeading: string;
    items: FeatureItem[];
  };
  footer: {
    title: string;
    email: string;
    contactText: string;
    addressText: string;
    copyright: string;
    links: FooterLink[];
  };
  homepageBlocks: HomepageBlock[];
  pages: SitePage[];
};

export const EDITABLE_BLOCK_TYPES: HomepageBlockType[] = [
  "hero",
  "gallery",
  "features",
  "footer",
];

export const BLOCK_LABELS: Record<HomepageBlockType, string> = {
  hero: "Hero Section",
  gallery: "Image Gallery",
  brand: "Brand Title",
  "app-download": "App Download",
  about: "About Section",
  features: "Feature Sections",
  results: "Results Section",
  partners: "Partners",
  testimonials: "Testimonials",
  footer: "Footer / Contact",
};
