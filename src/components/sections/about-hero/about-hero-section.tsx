import { HeroBanner } from "@/components/shared/hero-banner/hero-banner";
import type { AboutHeroContentValues } from "@/features/page-sections/schemas/about-hero.schema";
import type { SectionProps } from "@/components/home/sections/types";

export function AboutHeroSection({ content }: SectionProps) {
  const data = content as unknown as AboutHeroContentValues;

  const badge = data.badge;
  const heading = data.heading;
  const highlight = data.highlight;
  const description = data.description;
  const imageUrl = data.imageId ? `/api/media/${data.imageId}` : null;

  return (
    <HeroBanner
      badge={badge}
      heading={heading}
      highlight={highlight}
      description={description}
      ctaLabel={data.ctaLabel}
      ctaTarget={data.ctaTargetId}
      backgroundImageUrl={imageUrl}
      theme="dark"
    />
  );
}
