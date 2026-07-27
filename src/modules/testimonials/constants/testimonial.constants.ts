export const TESTIMONIAL_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
} as const;

export type TestimonialStatus = (typeof TESTIMONIAL_STATUS)[keyof typeof TESTIMONIAL_STATUS];
