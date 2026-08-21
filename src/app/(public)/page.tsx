import type { Metadata } from "next";
import { getHomePageData } from "@/modules/home/services/get-home-page";
import { SectionRenderer } from "@/components/home/section-renderer";
import { buildPageMetadata, serializeSchemaMarkup } from "@/lib/seo/build-page-metadata";

/**
 * ISR: revalidate the page every 60 seconds so content changes in the CMS
 * are reflected without a full redeploy.
 */
export const revalidate = 60;

// ─── SEO metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData();

  if (!data) {
    return {
      title: "Home",
      description: "Welcome to our website.",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata(data.meta);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const data = await getHomePageData();

  // Home page not yet published — render a graceful placeholder.
  if (!data) {
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
            Coming Soon
          </h1>
          <p className="relative text-muted-foreground text-lg">
            We&apos;re working on something great.
          </p>
        </div>
      </main>
    );
  }

  const jsonLd = serializeSchemaMarkup(data.meta.schemaMarkup);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <main className="pt-26">
        {data.sections.map((section) => (
          <SectionRenderer key={section.id} section={section} pageTitle={data.meta.title} />
        ))}
      </main>
    </>
  );
}
