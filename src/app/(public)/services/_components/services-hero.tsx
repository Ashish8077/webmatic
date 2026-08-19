import { PageHero } from "@/components/shared/page-hero/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { DEFAULT_SERVICES_HERO_CONTENT } from "@/features/page-sections/schemas/services-hero.schema";
import { getMediaUrl } from "@/features/media/utils/media-url";
import type { Media } from "@/features/media/types";
import type { JsonObject } from "@/shared/types/json";
import {
  AnimatedLightBadge,
  AnimatedHeading,
  AnimatedDescription,
} from "@/components/sections/about-hero/animated-content";

export interface ServicesHeroProps {
  content: JsonObject;
}

export function ServicesHero({ content }: ServicesHeroProps) {
  const raw = (content ?? {}) as Record<string, unknown>;
  const badge = (raw.badge as string) ?? DEFAULT_SERVICES_HERO_CONTENT.badge;
  const heading = (raw.heading as string) ?? DEFAULT_SERVICES_HERO_CONTENT.heading;
  const highlight = (raw.highlight as string) ?? DEFAULT_SERVICES_HERO_CONTENT.highlight;
  const description = (raw.description as string) ?? DEFAULT_SERVICES_HERO_CONTENT.description;
  const ctaLabel = (raw.ctaLabel as string) ?? DEFAULT_SERVICES_HERO_CONTENT.ctaLabel;
  const ctaTargetId = (raw.ctaTargetId as string) ?? DEFAULT_SERVICES_HERO_CONTENT.ctaTargetId;
  const secondaryCtaLabel = (raw.secondaryCtaLabel as string) ?? DEFAULT_SERVICES_HERO_CONTENT.secondaryCtaLabel;
  const secondaryCtaTargetId = (raw.secondaryCtaTargetId as string) ?? DEFAULT_SERVICES_HERO_CONTENT.secondaryCtaTargetId;
  const imageId = (raw.imageId as number | null) ?? DEFAULT_SERVICES_HERO_CONTENT.imageId;

  const imageUrl =
    getMediaUrl(raw.image as Media | null | undefined) ??
    (imageId ? `/api/media/${imageId}` : null);

  const titleNode = (
    <>
      {badge && (
        <AnimatedLightBadge>
          <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#0A1F44]">
            {badge}
          </span>
        </AnimatedLightBadge>
      )}
      <div className="block">
        <AnimatedHeading heading={heading} highlight={highlight} />
      </div>
    </>
  );

  return (
    <PageHero
      title={titleNode}
      description={
        description ? (
          <AnimatedDescription>{description}</AnimatedDescription>
        ) : undefined
      }
      primaryCta={ctaLabel ? { text: ctaLabel, href: ctaTargetId || "#" } : undefined}
      secondaryCta={secondaryCtaLabel ? { text: secondaryCtaLabel, href: secondaryCtaTargetId || "#" } : undefined}
      bannerImage={imageUrl}
      breadcrumbs={
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Services" }]}
          theme="light"
        />
      }
      theme="light"
    />
  );
}
