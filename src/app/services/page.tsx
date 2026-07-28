import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { ServicesHero } from "./_components/services-hero";
import { ServicesFaq } from "./_components/services-faq";
import { getServiceListPageData } from "@/modules/pages/services/get-public-page";
import { ContactCtaSection } from "@/components/home/sections/contact-cta-section/contact-cta-section";
import { TestimonialsSection } from "@/components/sections/testimonials/testimonials-section";
import { DevelopmentProcessSection } from "./_components/development-process";
import { ServiceSection } from "@/components/sections/services/services-section";
import type { ServicesHeroContentValues } from "@/features/page-sections/schemas/services-hero.schema";

import { homeSections } from "@/database/data/home-sections";

export const metadata: Metadata = {
  title: "Services | CMS Admin",
  description:
    "Explore our comprehensive range of services tailored to elevate your business.",
};

export default async function ServicesPage() {
  const pageData = await getServiceListPageData();
  const heroSection = pageData?.sections.find(
    (s) => s.sectionType === "services-hero",
  );
  const contactCtaSection = pageData?.sections.find(
    (s) => s.sectionType === "contact-cta",
  );
  const testimonialsSection =
    pageData?.sections.find((s) => s.sectionType === "testimonials") ??
    homeSections.find((s) => s.sectionType === "testimonials");
  const servicesSection = pageData?.sections.find(
    (s) => s.sectionType === "services",
  );

  return (
    <>
      <Header />
      <main className="pt-[104px]">
        {heroSection ? (
          <ServicesHero content={heroSection.content as unknown as ServicesHeroContentValues} />
        ) : (
          <ServicesHero
            content={{
              badge: "Our Services",
              heading: "Full-service Digital Marketing",
              highlight: "Expert Solutions",
              description: "Almost Overnight, the Internet's Gone From a Technical Wonder to a Business Must.",
              ctaLabel: "Explore Our Services",
              ctaTargetId: "services",
              secondaryCtaLabel: "",
              secondaryCtaTargetId: "",
              imageId: null as unknown as number,
            }}
          />
        )}
        {servicesSection && (
          <ServiceSection content={servicesSection.content} />
        )}
        {testimonialsSection && (
          <TestimonialsSection content={testimonialsSection.content} />
        )}
        <DevelopmentProcessSection />
        <ServicesFaq />
        {contactCtaSection && (
          <ContactCtaSection content={contactCtaSection.content} />
        )}
      </main>
    </>
  );
}
