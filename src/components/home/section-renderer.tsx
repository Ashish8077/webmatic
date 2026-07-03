import type { HomeSectionData } from "@/modules/home/get-home-page";
import { HeroSection } from "./sections/hero-section";
import { AboutSection } from "./sections/about-section";
import { ServicesSection } from "./sections/services-section";
import { WhyUsSection } from "./sections/why-us-section";
import { TestimonialsSection } from "./sections/testimonials-section";
import { FaqSection } from "./sections/faq-section";
import { ContactCtaSection } from "./sections/contact-cta-section";
import { FooterCtaSection } from "./sections/footer-cta-section";

// ─── Section component contract ───────────────────────────────────────────────

type SectionComponent = React.ComponentType<{
  content: Record<string, unknown>;
  title: string | null;
}>;

/**
 * Maps each supported section_name value to its rendering component.
 *
 * Keys must match the `sectionName` values stored in the database exactly.
 * Unknown names are silently skipped (no error thrown in production).
 */
const SECTION_MAP: Readonly<Record<string, SectionComponent>> = {
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
 * renders it. Returns null for unrecognised section names so new section types
 * can be introduced in the CMS without causing a runtime error.
 */
export function SectionRenderer({ section }: SectionRendererProps) {
  const Component = SECTION_MAP[section.sectionName];

  if (!Component) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[SectionRenderer] No component registered for sectionName: "${section.sectionName}". ` +
          `Add it to SECTION_MAP in section-renderer.tsx.`,
      );
    }
    return null;
  }

  return <Component content={section.content} title={section.title} />;
}
