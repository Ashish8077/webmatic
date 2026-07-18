import type { HomeSectionData } from "@/modules/home/types/home.types";
import { HomeSectionType } from "@/modules/home/constants/home-section-types";
import {
  AboutSection,
  HeroSection,
  ServiceSection,
  WhyChooseUsSection,
  TestimonialsSection,
  ContactCtaSection,
} from "./sections";
import { FaqSection } from "@/components/sections/faq";
import type { SectionProps } from "./sections/types";

// ─── Section component contract ───────────────────────────────────────────────

type SectionComponent = React.ComponentType<SectionProps>;

/**
 * Maps each supported section_type value to its rendering component.
 *
 * Keys must match the `sectionType` values stored in the database exactly.
 * Unknown names are silently skipped (no error thrown in production).
 */
const SECTION_MAP: Readonly<
  Partial<Record<HomeSectionType, SectionComponent>>
> = {
  hero: HeroSection,
  about: AboutSection,
  services: ServiceSection,
  "why-choose-us": WhyChooseUsSection,
  testimonials: TestimonialsSection,
  faq: FaqSection,
  "contact-cta": ContactCtaSection,
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

  return <Component content={section.content} settings={section.settings} />;
}
