import { useQuery } from "@tanstack/react-query";
import { getTestimonials, GetTestimonialsQuery } from "../api/get-testimonials";
import { TESTIMONIAL_QUERY_KEYS } from "../constants/query-keys";

export function useTestimonials(params: GetTestimonialsQuery) {
  return useQuery({
    queryKey: TESTIMONIAL_QUERY_KEYS.list(params as Record<string, unknown>),
    queryFn: () => getTestimonials(params),
  });
}
