import { Metadata } from "next";
import { getCachedPublishedPageBySlug } from "@/modules/pages/services/get-public-page";
import { findPageActiveSectionsByPageId } from "@/modules/pages-section/repositories/page-section.repository";
import { hydrateJsonMedia } from "@/modules/media/services/hydrate-json-media.service";
import { SectionRenderer } from "@/components/home/section-renderer";
import { buildPageMetadata, serializeSchemaMarkup } from "@/lib/seo/build-page-metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCachedPublishedPageBySlug("contact");

  if (!page) {
    return {
      title: "Contact Us | Webmatic",
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

export default async function ContactPage() {
  const page = await getCachedPublishedPageBySlug("contact");

  if (!page) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold">Contact Page Not Found</h1>
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
