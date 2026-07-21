import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { ServicesHero } from "./_components/services-hero";
import { ServicesIntro } from "./_components/services-intro";
import { ServicesGrid } from "./_components/services-grid";
import { ServicesCta } from "./_components/services-cta";
import { ServicesFaq } from "./_components/services-faq";
import { ServicesContact } from "./_components/services-contact";

export const metadata: Metadata = {
  title: "Services | CMS Admin",
  description: "Explore our comprehensive range of services tailored to elevate your business.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-[104px]">
        <ServicesHero />
        <ServicesIntro />
        <ServicesGrid />
        <ServicesCta />
        <ServicesFaq />
        <ServicesContact />
      </main>
    </>
  );
}
