import { PageHero } from "@/components/shared/page-hero/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import type { ServicesHeroContentValues } from "@/features/page-sections/schemas/services-hero.schema";

export interface ServicesHeroProps {
  content: ServicesHeroContentValues;
}

export function ServicesHero({ content }: ServicesHeroProps) {
  const {
    badge,
    heading,
    highlight,
    description,
    ctaLabel,
    ctaTargetId,
    secondaryCtaLabel,
    secondaryCtaTargetId,
    imageId,
  } = content;

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
