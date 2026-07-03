import { findPublishedPageBySlug } from "@/modules/pages/repositories/page.repository";
import { findPageSectionsByPageId } from "@/modules/pages-section/repositories/page-section.repository";

/** Slug that identifies the home page in the CMS. */
export const HOME_PAGE_SLUG = "home-page";

// ─── Public types ─────────────────────────────────────────────────────────────

export interface HomePageMeta {
  title: string;
  seoTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  robotsIndex: boolean;
  robotsFollow: boolean;
}

export interface HomeSectionData {
  id: number;
  sectionName: string;
  title: string | null;
  /** Raw JSON content stored in the database. */
  content: Record<string, unknown>;
  sortOrder: number;
}

export interface HomePageData {
  meta: HomePageMeta;
  sections: HomeSectionData[];
}

// ─── Data fetcher ─────────────────────────────────────────────────────────────

/**
 * Fetches the published home page and its active sections directly from the
 * repository layer. This function is intentionally auth-free — it is designed
 * for the public-facing website, not the admin panel.
 *
 * Returns null when the home page does not exist or is not yet published.
 */
export async function getHomePageData(): Promise<HomePageData | null> {
  const page = await findPublishedPageBySlug(HOME_PAGE_SLUG);

  if (!page) return null;

  const sectionRows = await findPageSectionsByPageId(page.id);

  const sections: HomeSectionData[] = sectionRows
    .filter((row) => Boolean(row.is_active))
    .map((row) => ({
      id: row.id,
      sectionName: row.section_name,
      title: row.title,
      content: (row.content ?? {}) as Record<string, unknown>,
      sortOrder: row.sort_order,
    }));

  return {
    meta: {
      title: page.title,
      seoTitle: page.seo_title,
      metaDescription: page.meta_description,
      canonicalUrl: page.canonical_url,
      robotsIndex: Boolean(page.robots_index),
      robotsFollow: Boolean(page.robots_follow),
    },
    sections,
  };
}
