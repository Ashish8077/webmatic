import { RawTestimonialContent, TestimonialContent, TestimonialItem } from "./types";

export function normaliseTestimonialContent(
  raw: RawTestimonialContent | undefined | null,
): TestimonialContent {
  const safeRaw = raw || {};

  const testimonials = (safeRaw.testimonials || [])
    .filter((t) => t.status !== "draft")
    .map((t) => ({
      clientName: t.clientName || "",
      clientDesignation: t.clientDesignation || "",
      companyName: t.companyName || "",
      imageId: typeof t.imageId === "number" ? t.imageId : null,
      testimonialTitle: t.testimonialTitle || "",
      testimonialDescription: t.testimonialDescription || "",
      rating: typeof t.rating === "number" ? t.rating : 5,
      sortOrder: typeof t.sortOrder === "number" ? t.sortOrder : 0,
      status: t.status || "published",
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return {
    badge: safeRaw.badge || "",
    heading: safeRaw.heading || "",
    highlight: safeRaw.highlight || "",
    description: safeRaw.description || "",
    backgroundColor: safeRaw.backgroundColor || "",
    backgroundImageId:
      typeof safeRaw.backgroundImageId === "number"
        ? safeRaw.backgroundImageId
        : null,
    testimonials,
  };
}
