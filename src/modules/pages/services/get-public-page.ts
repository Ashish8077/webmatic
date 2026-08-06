import { cache } from "react";
import { findPageActiveSectionsByPageId } from "@/modules/pages-section/repositories/page-section.repository";
import { findPublishedPageByTemplate, findPublishedPageBySlug } from "@/modules/pages/repositories/page.repository";
import { PageSectionRow } from "@/modules/pages-section/types/repository.types";
import { findServices } from "@/modules/services/repositories/service.repository";
import { findTestimonials } from "@/modules/testimonials/repositories/testimonial.repository";
import { hydrateJsonMedia } from "@/modules/media/services/hydrate-json-media.service";
import { resolveMediaUrl } from "@/modules/media/services/resolve-media-url";

/**
 * Cached wrapper around findPublishedPageBySlug so that generateMetadata()
 * and the Page component share the same data within a single request.
 */
export const getCachedPublishedPageBySlug = cache(
  async (slug: string) => {
    const page = await findPublishedPageBySlug(slug);
    if (!page) return null;

    const [ogImage, twitterImage] = await Promise.all([
      resolveMediaUrl(page.og_image_id),
      resolveMediaUrl(page.twitter_image_id),
    ]);

    return {
      ...page,
      ogImageUrl: ogImage?.url ?? null,
      twitterImageUrl: twitterImage?.url ?? null,
    };
  },
);

export async function getServiceListPageData() {
  const page = await findPublishedPageByTemplate("service-list");

  if (!page) return null;

  const sectionRows: PageSectionRow[] = await findPageActiveSectionsByPageId(
    page.id,
  );

  const sections = await Promise.all(
    sectionRows.map(async (row) => {
      let content = row.content as Record<string, unknown>;

      if (row.section_type === "services") {
        const services = await findServices({
          page: 1,
          limit: 100, // Fetch all for Services page
          status: "published",
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
    })
  );

  // Resolve OG and Twitter image IDs into public URLs
  const [ogImage, twitterImage] = await Promise.all([
    resolveMediaUrl(page.og_image_id),
    resolveMediaUrl(page.twitter_image_id),
  ]);

  return {
    meta: {
      title: page.title,
      seoTitle: page.seo_title,
      metaDescription: page.meta_description,
      metaKeywords: page.meta_keywords,
      canonicalUrl: page.canonical_url,
      ogTitle: page.og_title,
      ogDescription: page.og_description,
      ogImageUrl: ogImage?.url ?? null,
      twitterTitle: page.twitter_title,
      twitterDescription: page.twitter_description,
      twitterImageUrl: twitterImage?.url ?? null,
      robotsIndex: Boolean(page.robots_index),
      robotsFollow: Boolean(page.robots_follow),
      schemaMarkup: page.schema_markup,
    },
    sections,
  };
}

export async function getBlogListPageData() {
  const page = await findPublishedPageByTemplate("blog-list");

  if (!page) return null;

  const sectionRows: PageSectionRow[] = await findPageActiveSectionsByPageId(
    page.id,
  );

  const sections = await Promise.all(
    sectionRows.map(async (row) => {
      let content = row.content as Record<string, unknown>;
      content = (await hydrateJsonMedia(content)) as Record<string, unknown>;

      return {
        id: row.id,
        sectionType: row.section_type,
        title: row.title,
        content,
        settings: row.settings,
        sortOrder: row.sort_order,
      };
    })
  );

  // Resolve OG and Twitter image IDs into public URLs
  const [ogImage, twitterImage] = await Promise.all([
    resolveMediaUrl(page.og_image_id),
    resolveMediaUrl(page.twitter_image_id),
  ]);

  return {
    meta: {
      title: page.title,
      seoTitle: page.seo_title,
      metaDescription: page.meta_description,
      metaKeywords: page.meta_keywords,
      canonicalUrl: page.canonical_url,
      ogTitle: page.og_title,
      ogDescription: page.og_description,
      ogImageUrl: ogImage?.url ?? null,
      twitterTitle: page.twitter_title,
      twitterDescription: page.twitter_description,
      twitterImageUrl: twitterImage?.url ?? null,
      robotsIndex: Boolean(page.robots_index),
      robotsFollow: Boolean(page.robots_follow),
      schemaMarkup: page.schema_markup,
    },
    sections,
  };
}
