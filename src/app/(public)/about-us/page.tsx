import type { Metadata } from "next";
import { getCachedPublishedPageBySlug } from "@/modules/pages/services/get-public-page";
import { findPageActiveSectionsByPageId } from "@/modules/pages-section/repositories/page-section.repository";
import { hydrateJsonMedia } from "@/modules/media/services/hydrate-json-media.service";
import { SectionRenderer } from "@/components/home/section-renderer";
import { buildPageMetadata, serializeSchemaMarkup } from "@/lib/seo/build-page-metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCachedPublishedPageBySlug("about-us");

  if (!page) {
    return {
      title: "About Us",
      description: "Learn more about us.",
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

export default async function AboutUsPage() {
  const page = await getCachedPublishedPageBySlug("about-us");

  if (!page) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="relative">
          <div
            className="absolute inset-0 blur-3xl opacity-20 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle, #6366f1 0%, transparent 70%)",
            }}
          />
          <h1 className="relative text-5xl sm:text-6xl font-extrabold gradient-text mb-4">
            About Us Coming Soon
          </h1>
          <p className="relative text-muted-foreground text-lg">
            Please create a page with slug &quot;about-us&quot; in the CMS and add the
            About Hero and Company Statistics sections.
          </p>
        </div>
      </main>
    );
  }

  const sectionRows = await findPageActiveSectionsByPageId(page.id);


  const sections = await Promise.all(
    sectionRows.map(async (row) => ({
      id: row.id,
      sectionType: row.section_type,
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
          <SectionRenderer key={section.id} section={section as unknown as React.ComponentProps<typeof SectionRenderer>["section"]} pageTitle={page.title} />
        ))}
      </main>
    </>
  );
}
