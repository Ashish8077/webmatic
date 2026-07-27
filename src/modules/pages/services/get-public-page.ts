import { findPageActiveSectionsByPageId } from "@/modules/pages-section/repositories/page-section.repository";
import { findPublishedPageByTemplate } from "@/modules/pages/repositories/page.repository";
import { PageSectionRow } from "@/modules/pages-section/types/repository.types";
import { findServices } from "@/modules/services/repositories/service.repository";
import { findTestimonials } from "@/modules/testimonials/repositories/testimonial.repository";

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

  return {
    meta: {
      title: page.title,
      seoTitle: page.seo_title,
      metaDescription: page.meta_description,
      metaKeywords: page.meta_keywords,
    },
    sections,
  };
}
