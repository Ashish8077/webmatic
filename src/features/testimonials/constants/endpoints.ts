export const TESTIMONIAL_ENDPOINTS = {
  TESTIMONIALS: "/testimonials",
  TESTIMONIAL: (id: string | number) => `/testimonials/${id}`,
} as const;
