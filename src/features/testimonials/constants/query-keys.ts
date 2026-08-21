export const TESTIMONIAL_QUERY_KEYS = {
  all: ["testimonials"] as const,
  lists: () => [...TESTIMONIAL_QUERY_KEYS.all, "list"] as const,
  list: (params: Record<string, unknown>) =>
    [...TESTIMONIAL_QUERY_KEYS.lists(), params] as const,
  details: () => [...TESTIMONIAL_QUERY_KEYS.all, "detail"] as const,
  detail: (id: number) => [...TESTIMONIAL_QUERY_KEYS.details(), id] as const,
};
