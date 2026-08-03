import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findPublishedPageBySlug } from "@/modules/pages/repositories/page.repository";
import { findPageActiveSectionsByPageId } from "@/modules/pages-section/repositories/page-section.repository";
import { hydrateJsonMedia } from "@/modules/media/services/hydrate-json-media.service";
import { SectionRenderer } from "@/components/home/section-renderer";
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
  const page = await findPublishedPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",
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

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await findPublishedPageBySlug(slug);

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

  return (
    <>
      <main className="pt-[104px]">
        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section as unknown as HomeSectionData} pageTitle={page.title} />
        ))}
      </main>
    </>
  );
}
