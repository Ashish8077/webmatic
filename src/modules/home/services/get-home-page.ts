import { findPageActiveSectionsByPageId } from "@/modules/pages-section/repositories/page-section.repository";
import { findPublishedPageByTemplate } from "../../pages/repositories/page.repository";
import { PageSectionRow } from "../../pages-section/types/repository.types";
import { HomePageData, HomeSectionData } from "../types/home.types";

// ─── Data fetcher ─────────────────────────────────────────────────────────────

/**
 * Fetches the published home page and its active sections directly from the
 * repository layer. This function is intentionally auth-free — it is designed
 * for the public-facing website, not the admin panel.
 *
 * Returns null when the home page does not exist or is not yet published.
 */
export async function getHomePageData(): Promise<HomePageData | null> {
  const page = await findPublishedPageByTemplate("home");

  if (!page) return null;

  const sectionRows: PageSectionRow[] = await findPageActiveSectionsByPageId(
    page.id,
  );

  const sections: HomeSectionData[] = sectionRows.map((row) => ({
    id: row.id,
    sectionType: row.section_type,
    title: row.title,
    content: row.content,
    settings: row.settings,
    sortOrder: row.sort_order,
  }));

  return {
    meta: {
      title: page.title,
      seoTitle: page.seo_title,
      metaDescription: page.meta_description,
      metaKeywords: page.meta_keywords,
      canonicalUrl: page.canonical_url,

      ogTitle: page.og_title,
      ogDescription: page.og_description,
      ogImageId: page.og_image_id,

      twitterTitle: page.twitter_title,
      twitterDescription: page.twitter_description,
      twitterImageId: page.twitter_image_id,

      robotsIndex: Boolean(page.robots_index),
      robotsFollow: Boolean(page.robots_follow),

      schemaMarkup: page.schema_markup,
    },
    sections,
  };
}
