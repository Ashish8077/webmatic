import type { Metadata } from "next";
import { findPublishedPageBySlug } from "@/modules/pages/repositories/page.repository";
import { findPageActiveSectionsByPageId } from "@/modules/pages-section/repositories/page-section.repository";
import { SectionRenderer } from "@/components/home/section-renderer";
import { Header } from "@/components/layout/header";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await findPublishedPageBySlug("about-us");

  if (!page) {
    return {
      title: "About Us",
      description: "Learn more about us.",
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

export default async function AboutUsPage() {
  const page = await findPublishedPageBySlug("about-us");

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


  const sections = sectionRows.map((row) => ({
    id: row.id,
    sectionType: row.section_type,
    title: row.title,
    content: row.content,
    settings: row.settings,
    sortOrder: row.sort_order,
  }));

  return (
    <>
      <Header />
      <main className="pt-[104px]">
        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section as unknown as React.ComponentProps<typeof SectionRenderer>["section"]} />
        ))}
      </main>
    </>
  );
}
