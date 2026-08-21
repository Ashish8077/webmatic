import { PageHero } from "@/components/shared/page-hero/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import type { AboutHeroContentValues } from "@/features/page-sections/schemas/about-hero.schema";
import type { SectionProps } from "@/components/home/sections/types";
import { getMediaUrl } from "@/features/media/utils/media-url";
import {
  AnimatedBadge,
  AnimatedHeading,
  AnimatedDescription,
} from "./animated-content";

export function AboutHeroSection({ content, pageTitle }: SectionProps) {
  const data = content as unknown as AboutHeroContentValues;

  const badge = data.badge;
  const heading = data.heading;
  const highlight = data.highlight;
  const description = data.description;
  const imageUrl =
    getMediaUrl(data.image) ?? (data.imageId ? `/api/media/${data.imageId}` : null);

  const titleNode = (
    <>
      {/* Badge block embedded in the title area to match old layout or kept separate.
          Since PageHero expects title as a node, we can construct the exact desired HTML. */}
      {badge && (
        <AnimatedBadge>
          <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-white">
            {badge}
          </span>
        </AnimatedBadge>
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
      bannerImage={imageUrl}
      breadcrumbs={
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: pageTitle || "About Us" }
          ]}
          theme="dark"
        />
      }
      primaryCta={data.ctaLabel ? { text: data.ctaLabel, href: data.ctaTargetId || "#" } : undefined}
      theme="dark"
    />
  );
}
