import { PageHero } from "@/components/shared/page-hero/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import type { AboutHeroContentValues } from "@/features/page-sections/schemas/about-hero.schema";
import type { SectionProps } from "@/components/home/sections/types";

export function AboutHeroSection({ content }: SectionProps) {
  const data = content as unknown as AboutHeroContentValues;

  const badge = data.badge;
  const heading = data.heading;
  const highlight = data.highlight;
  const description = data.description;
  const imageUrl = data.imageId ? `/api/media/${data.imageId}` : null;

  const titleNode = (
    <>
      {/* Badge block embedded in the title area to match old layout or kept separate.
          Since PageHero expects title as a node, we can construct the exact desired HTML. */}
      {badge && (
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-white">
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
      bannerImage={imageUrl}
      breadcrumbs={
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About Us" }
          ]}
          theme="dark"
        />
      }
      primaryCta={data.ctaLabel ? { text: data.ctaLabel, href: data.ctaTargetId || "#" } : undefined}
      theme="dark"
    />
  );
}
