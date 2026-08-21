import { useQuery } from "@tanstack/react-query";
import { getTestimonial } from "../api/get-testimonial";
import { TESTIMONIAL_QUERY_KEYS } from "../constants/query-keys";

export function useTestimonial(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: TESTIMONIAL_QUERY_KEYS.detail(id),
    queryFn: () => getTestimonial(id),
    enabled: options?.enabled,
  });
}
