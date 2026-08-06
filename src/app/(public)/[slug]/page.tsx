import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCachedPublishedPageBySlug } from "@/modules/pages/services/get-public-page";
import { findPageActiveSectionsByPageId } from "@/modules/pages-section/repositories/page-section.repository";
import { hydrateJsonMedia } from "@/modules/media/services/hydrate-json-media.service";
import { SectionRenderer } from "@/components/home/section-renderer";
import { buildPageMetadata, serializeSchemaMarkup } from "@/lib/seo/build-page-metadata";
import type { PageSectionType } from "@/modules/pages-section/constants/page-section-types";
import type { HomeSectionData } from "@/modules/home/types/home.types";

export const revalidate = 60;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getCachedPublishedPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",
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

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getCachedPublishedPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const sectionRows = await findPageActiveSectionsByPageId(page.id);

  // The order comes from the CMS section ordering system (sortOrder)
  const sections = await Promise.all(
    sectionRows.map(async (row) => ({
      id: row.id,
      sectionType: row.section_type as PageSectionType,
      title: row.title,
      content: (await hydrateJsonMedia(row.content)) as Record<string, unknown>,
      settings: row.settings,
      sortOrder: row.sort_order,
    })),
  );

  const jsonLd = serializeSchemaMarkup(page.schema_markup);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <main className="pt-26">
        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section as unknown as HomeSectionData} pageTitle={page.title} />
        ))}
      </main>
    </>
  );
}
