import { findPageActiveSectionsByPageId } from "@/modules/pages-section/repositories/page-section.repository";
import { findPublishedPageByTemplate } from "../../pages/repositories/page.repository";
import { PageSectionRow } from "../../pages-section/types/repository.types";
import { HomePageData, HomeSectionData } from "../types/home.types";

import { findServices } from "@/modules/services/repositories/service.repository";
import { findTestimonials } from "@/modules/testimonials/repositories/testimonial.repository";
import { hydrateJsonMedia } from "@/modules/media/services/hydrate-json-media.service";

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

  const sections: HomeSectionData[] = await Promise.all(
    sectionRows.map(async (row) => {
      let content = row.content as Record<string, unknown>;

      if (row.section_type === "services") {
        const services = await findServices({
          page: 1,
          limit: 6,
          status: "published",
          isFeatured: true,
          sortBy: "sort_order",
          sortOrder: "asc",
        });
        
        content = {
          ...content,
          services: services.map((service) => ({
            key: service.slug,
            title: service.name,
            description: service.short_description,
            imageId: service.featured_image_id,
            slug: service.slug,
            ctaButtonText: service.cta_button_text,
          })),
        };
      }

      if (row.section_type === "testimonials") {
        const testimonials = await findTestimonials({
          page: 1,
          limit: 10,
          status: "published",
          sortBy: "sort_order",
          sortOrder: "asc",
        });
        
        content = {
          ...content,
          testimonials: testimonials.map((t) => ({
            clientName: t.client_name,
            clientDesignation: t.designation || "",
            companyName: t.company_name || "",
            imageId: t.profile_image_id,
            testimonialTitle: t.title || "",
            testimonialDescription: t.description,
            rating: t.rating,
          })),
        };
      }

      content = (await hydrateJsonMedia(content)) as Record<string, unknown>;

      return {
        id: row.id,
        sectionType: row.section_type,
        title: row.title,
        content,
        settings: row.settings,
        sortOrder: row.sort_order,
      };
    }),
  );

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
