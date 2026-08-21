import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/shared/page-hero/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { getCachedPublishedPageBySlug } from "@/modules/pages/services/get-public-page";
import { findPageActiveSectionsByPageId } from "@/modules/pages-section/repositories/page-section.repository";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";
import { getWorkProjectsService } from "@/modules/work/services/get-work-projects.service";
import { WorkProjectList, type Project } from "./_components/work-project-list";
import { Media } from "@/features/media/types";
import { getMediaUrl } from "@/features/media/utils/media-url";
import {
  AnimatedLightBadge,
  AnimatedHeading,
  AnimatedDescription,
} from "@/components/sections/about-hero/animated-content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCachedPublishedPageBySlug("work");
  
  if (!page) {
    return {
      title: "Our Work",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: page.title,
    seoTitle: page.seo_title,
    metaDescription: page.meta_description,
    metaKeywords: page.meta_keywords,
    canonicalUrl: page.canonical_url,
    ogTitle: page.og_title,
    ogDescription: page.og_description,
    ogImageUrl: page.ogImageUrl,
    twitterTitle: page.twitter_title,
    twitterDescription: page.twitter_description,
    twitterImageUrl: page.twitterImageUrl,
    robotsIndex: Boolean(page.robots_index),
    robotsFollow: Boolean(page.robots_follow),
    schemaMarkup: page.schema_markup,
  });
}

export default async function WorkPage() {
  const page = await getCachedPublishedPageBySlug("work");

  if (!page) {
    notFound();
  }

  const sectionRows = await findPageActiveSectionsByPageId(page.id);
  const heroSectionRow = sectionRows.find((row) => row.section_type === "hero");
  let heroContent: Record<string, unknown> = {};
  if (heroSectionRow) {
    heroContent = heroSectionRow.content as Record<string, unknown>;
  }
  
  const slide = (heroContent?.slides as Record<string, unknown>[])?.[0] || {};
  const bannerImage = getMediaUrl(slide.backgroundImage as Media | null);
  const badge = (slide.badge as string) || "Our Work";
  const heading = (slide.headline as string) || page.title;
  const highlight = (slide.highlight as string) || "";
  const subheadline = (slide.subheadline as string) || "Explore our latest work and success stories.";
  
  const primaryButton = slide.primaryButton as { text?: string; url?: string } | undefined;
  const secondaryButton = slide.secondaryButton as { text?: string; url?: string } | undefined;

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

  // Fetch all published work projects
  const { items: projects } = await getWorkProjectsService({
    status: "published",
    sortBy: "sort_order",
    sortOrder: "asc",
    limit: 100, // fetching all since it's a portfolio
    page: 1,
  });

  return (
    <>
      <Header />
      <main className="pt-26">
        <PageHero
          title={titleNode}
          description={
            subheadline ? (
              <AnimatedDescription>{subheadline}</AnimatedDescription>
            ) : undefined
          }
          bannerImage={bannerImage}
          primaryCta={primaryButton?.text && primaryButton?.url ? { text: primaryButton.text, href: primaryButton.url } : undefined}
          secondaryCta={secondaryButton?.text && secondaryButton?.url ? { text: secondaryButton.text, href: secondaryButton.url } : undefined}
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Our Work" },
              ]}
              theme="light"
            />
          }
          theme="light"
        />

        <section id="featured-projects" className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-225 px-5 sm:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Featured Projects
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Discover how we&apos;ve helped businesses transform their digital presence.
              </p>
            </div>
            
            <WorkProjectList projects={projects as unknown as Project[]} />
          </div>
        </section>

      </main>
    </>
  );
}
