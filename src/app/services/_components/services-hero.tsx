import { PageHero } from "@/components/shared/page-hero/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import type { ServicesHeroContentValues } from "@/features/page-sections/schemas/services-hero.schema";

import { DEFAULT_SERVICES_HERO_CONTENT } from "@/features/page-sections/schemas/services-hero.schema";
import type { JsonObject } from "@/shared/types/json";

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

  const imageUrl = imageId ? `/api/media/${imageId}` : null;

  const titleNode = (
    <>
      {badge && (
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#0A1F44]">
            {badge}
          </span>
        </div>
      )}
      <div className="block">
        {heading}{" "}
        {highlight && (
          <span className="relative whitespace-nowrap">
            <span className="relative z-10 text-orange-500">{highlight}</span>
            <span className="absolute bottom-1.5 sm:bottom-2 left-0 w-full h-3 sm:h-4 bg-orange-500/10 -z-10 rounded-sm" />
          </span>
        )}
      </div>
    </>
  );

  return (
    <PageHero
      title={titleNode}
      description={description}
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
