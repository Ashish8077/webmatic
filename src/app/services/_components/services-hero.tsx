import { HeroBanner } from "@/components/shared/hero-banner/hero-banner";

export interface ServicesHeroProps {
  /**
   * Optional background image uploaded by the administrator.
   * If provided, renders Mode 1 (Image with premium overlay).
   * If omitted, renders Mode 2 (Light gradient fallback).
   */
  backgroundImage?: string;
}

export function ServicesHero({ backgroundImage }: ServicesHeroProps = {}) {
  return (
    <HeroBanner
      badge="Our Services"
      heading="Full-service Digital Marketing"
      highlight="Expert Solutions"
      description="Almost Overnight, the Internet&apos;s Gone From a Technical Wonder to a Business Must."
      ctaLabel="Explore Our Services"
      ctaTarget="services"
      backgroundImageUrl={backgroundImage || null}
      theme="light"
    />
  );
}
