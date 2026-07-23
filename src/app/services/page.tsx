import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { ServicesHero } from "./_components/services-hero";
import { ServicesIntro } from "./_components/services-intro";
import { ServicesGrid } from "./_components/services-grid";
import { ServicesCta } from "./_components/services-cta";
import { ServicesFaq } from "./_components/services-faq";
import { getHomePageData } from "@/modules/home/services/get-home-page";
import { ContactCtaSection } from "@/components/home/sections/contact-cta-section/contact-cta-section";
import { TestimonialsSection } from "@/components/sections/testimonials/testimonials-section";

export const metadata: Metadata = {
  title: "Services | CMS Admin",
  description: "Explore our comprehensive range of services tailored to elevate your business.",
};

export default async function ServicesPage() {
  const homeData = await getHomePageData();
  const contactCtaSection = homeData?.sections.find((s) => s.sectionType === "contact-cta");
  const testimonialsSection = homeData?.sections.find((s) => s.sectionType === "testimonials");

  return (
    <>
      <Header />
      <main className="pt-[104px]">
        <ServicesHero />
        <ServicesIntro />
        <ServicesGrid />
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
