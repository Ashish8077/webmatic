import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { ServicesHero } from "./_components/services-hero";
import { ServicesCta } from "./_components/services-cta";
import { ServicesFaq } from "./_components/services-faq";
import { getServiceListPageData } from "@/modules/pages/services/get-public-page";
import { ContactCtaSection } from "@/components/home/sections/contact-cta-section/contact-cta-section";
import { TestimonialsSection } from "@/components/sections/testimonials/testimonials-section";
import { ServiceSection } from "@/components/sections/services/services-section";

export const metadata: Metadata = {
  title: "Services | CMS Admin",
  description: "Explore our comprehensive range of services tailored to elevate your business.",
};

export default async function ServicesPage() {
  const pageData = await getServiceListPageData();
  const contactCtaSection = pageData?.sections.find((s) => s.sectionType === "contact-cta");
  const testimonialsSection = pageData?.sections.find((s) => s.sectionType === "testimonials");
  const servicesSection = pageData?.sections.find((s) => s.sectionType === "services");

  return (
    <>
      <Header />
      <main className="pt-[104px]">
        <ServicesHero />
        {servicesSection && (
          <ServiceSection content={servicesSection.content} />
        )}
        <ServicesCta />
        <ServicesFaq />
        {testimonialsSection && (
          <TestimonialsSection content={testimonialsSection.content} />
        )}
        {contactCtaSection && (
          <ContactCtaSection content={contactCtaSection.content} />
        )}
      </main>
    </>
  );
}
