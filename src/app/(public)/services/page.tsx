import type { Metadata } from "next";
import { getServiceListPageData } from "@/modules/pages/services/get-public-page";
import { SectionRenderer } from "@/components/home/section-renderer";
import { buildPageMetadata, serializeSchemaMarkup } from "@/lib/seo/build-page-metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getServiceListPageData();

  if (!pageData) {
    return {
      title: "Services",
      description: "Explore our comprehensive range of services.",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: pageData.meta.title,
    seoTitle: pageData.meta.seoTitle,
    metaDescription: pageData.meta.metaDescription,
    metaKeywords: pageData.meta.metaKeywords,
    canonicalUrl: pageData.meta.canonicalUrl ?? null,
    ogTitle: pageData.meta.ogTitle ?? null,
    ogDescription: pageData.meta.ogDescription ?? null,
    ogImageUrl: pageData.meta.ogImageUrl ?? null,
    twitterTitle: pageData.meta.twitterTitle ?? null,
    twitterDescription: pageData.meta.twitterDescription ?? null,
    twitterImageUrl: pageData.meta.twitterImageUrl ?? null,
    robotsIndex: pageData.meta.robotsIndex ?? true,
    robotsFollow: pageData.meta.robotsFollow ?? true,
    schemaMarkup: pageData.meta.schemaMarkup ?? null,
  });
}

export default async function ServicesPage() {
  const pageData = await getServiceListPageData();

  if (!pageData) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold">Services</h1>
        <p className="mt-4 text-muted-foreground">Loading services...</p>
      </main>
    );
  }

  // Sort sections by sortOrder just like the home page
  const sortedSections = [...pageData.sections].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  const jsonLd = serializeSchemaMarkup(pageData.meta.schemaMarkup ?? null);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <main className="pt-26">
        {sortedSections.map((section) => (
          <SectionRenderer key={section.id} section={section} pageTitle={pageData.meta.title} />
        ))}
      </main>
    </>
  );
}
