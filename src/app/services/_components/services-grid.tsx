import ServiceCard from "@/components/home/sections/services-section/service-card";
import type { ServiceCard as ServiceCardType } from "@/components/home/sections/services-section/types";

const mockServices: ServiceCardType[] = [
  {
    key: "web-development",
    title: "Web Development",
    description: "Custom, responsive, and high-performance websites built with the latest technologies to elevate your brand online.",
    imageId: null,
    button: { text: "Learn More", to: "/services" },
  },
  {
    key: "app-development",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications designed to provide seamless user experiences on iOS and Android.",
    imageId: null,
    button: { text: "Learn More", to: "/services" },
  },
  {
    key: "brand-marketing",
    title: "Brand Strategy & Marketing",
    description: "Data-driven marketing strategies and brand identity design to help you stand out in a crowded market.",
    imageId: null,
    button: { text: "Learn More", to: "/services" },
  },
  {
    key: "digital-marketing",
    title: "Digital Marketing & SEO",
    description: "Increase your online visibility and drive targeted traffic with our comprehensive digital marketing services.",
    imageId: null,
    button: { text: "Learn More", to: "/services" },
  },
  {
    key: "content-writing",
    title: "Content Creation",
    description: "Engaging and SEO-optimized content that tells your story and connects with your target audience effectively.",
    imageId: null,
    button: { text: "Learn More", to: "/services" },
  },
  {
    key: "game-development",
    title: "Interactive Experiences",
    description: "Immersive games and interactive digital experiences that captivate users and drive deep engagement.",
    imageId: null,
    button: { text: "Learn More", to: "/services" },
  },
];

export function ServicesGrid() {
  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mockServices.map((service) => (
            <ServiceCard key={service.key} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
