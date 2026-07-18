import { RawTestimonialContent, TestimonialContent } from "./types";

export function normaliseTestimonialContent(
  raw: RawTestimonialContent,
): TestimonialContent {
  return {
    badge: raw.badge,
    heading: raw.heading,
    highlight: raw.highlight,
    description: raw.description,
    testimonials:
      raw.testimonials?.map((testimonial) => ({
        title: testimonial.title,
        description: testimonial.description,
        authorName: testimonial.authorName,
        authorDesignation: testimonial.authorDesignation,
        authorImageId: testimonial.authorImageId,
      })) || [],
  };
}
