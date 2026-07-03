import type { HomeSectionData } from "@/modules/home/get-home-page";
import { HeroSection } from "./sections/hero-section";
import { AboutSection } from "./sections/about-section";
import { ServicesSection } from "./sections/services-section";
import { WhyUsSection } from "./sections/why-us-section";
import { TestimonialsSection } from "./sections/testimonials-section";
import { FaqSection } from "./sections/faq-section";
import { ContactCtaSection } from "./sections/contact-cta-section";
import { FooterCtaSection } from "./sections/footer-cta-section";

import type { HomeSectionType } from "@/shared/constants/section-types";

// ─── Section component contract ───────────────────────────────────────────────

type SectionComponent = React.ComponentType<{
  content: Record<string, unknown>;
  title: string | null;
}>;

/**
 * Maps each supported section_type value to its rendering component.
 *
 * Keys must match the `sectionType` values stored in the database exactly.
 * Unknown names are silently skipped (no error thrown in production).
 */
const SECTION_MAP: Readonly<Record<HomeSectionType, SectionComponent>> = {
  hero: HeroSection,
  about: AboutSection,
  services: ServicesSection,
  "why-us": WhyUsSection,
  testimonials: TestimonialsSection,
  faq: FaqSection,
  "contact-cta": ContactCtaSection,
  "footer-cta": FooterCtaSection,
};

// ─── Component ────────────────────────────────────────────────────────────────

interface SectionRendererProps {
  section: HomeSectionData;
}

/**
 * Resolves a HomeSectionData record to its corresponding React component and
 * renders it. Returns null for unrecognised section types so new section types
 * can be introduced in the CMS without causing a runtime error.
 */
export function SectionRenderer({ section }: SectionRendererProps) {
  const Component = SECTION_MAP[section.sectionType];

  if (!Component) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[SectionRenderer] No component registered for sectionType: "${section.sectionType}". ` +
          `Add it to SECTION_MAP in section-renderer.tsx.`,
      );
    }
    return null;
  }

  return <Component content={section.content} title={section.title} />;
}
