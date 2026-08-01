import type { Metadata } from "next";
import { findPublishedPageBySlug } from "@/modules/pages/repositories/page.repository";
import { findPageActiveSectionsByPageId } from "@/modules/pages-section/repositories/page-section.repository";
import { hydrateJsonMedia } from "@/modules/media/services/hydrate-json-media.service";
import { SectionRenderer } from "@/components/home/section-renderer";
import { Header } from "@/components/layout/header";
import type { PageSectionType } from "@/modules/pages-section/constants/page-section-types";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await findPublishedPageBySlug("contact");

  if (!page) {
    return {
      title: "Contact Us",
      description: "Get in touch with us.",
    };
  }

  return {
    title: page.seo_title ?? page.title,
    description: page.meta_description ?? undefined,
    ...(page.canonical_url && {
      alternates: { canonical: page.canonical_url },
    }),
    robots: {
      index: Boolean(page.robots_index),
      follow: Boolean(page.robots_follow),
    },
  };
}

export default async function ContactPage() {
  const page = await findPublishedPageBySlug("contact");

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
            Contact Us Coming Soon
          </h1>
          <p className="relative text-muted-foreground text-lg">
            Please create a page with slug &quot;contact&quot; in the CMS.
          </p>
        </div>
      </main>
    );
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

  return (
    <>
      <Header />
      <main className="pt-[104px]">
        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section as any} />
        ))}
      </main>
    </>
  );
}
