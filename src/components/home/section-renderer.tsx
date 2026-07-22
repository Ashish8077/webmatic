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
import { AboutHeroSection } from "@/components/sections/about-hero/about-hero-section";
import { CompanyStatisticsSection } from "@/components/sections/company-statistics/company-statistics-section";
import { CompanyOverviewSection } from "@/components/sections/company-overview/company-overview-section";
import { CoreValuesSection } from "@/components/sections/core-values/core-values-section";
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
  "about-hero": AboutHeroSection as unknown as SectionComponent,
  "company-statistics": CompanyStatisticsSection as unknown as SectionComponent,
  "company-overview": CompanyOverviewSection as unknown as SectionComponent,
  "core-values": CoreValuesSection as unknown as SectionComponent,
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
  const Component = SECTION_MAP[section.sectionType as HomeSectionType];

  if (!Component) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div className="p-4 border border-dashed border-red-500 text-red-500 bg-red-50 m-4 rounded">
          <p className="font-bold">Unknown Section Type</p>
          <p className="text-sm mt-1">
            The section type <code>{section.sectionType}</code> is not registered
            in the section renderer.
          </p>
        </div>
      );
    }
    return null;
  }

  return <Component content={section.content} settings={section.settings} />;
}
