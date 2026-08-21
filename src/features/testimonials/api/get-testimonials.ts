import { apiClient } from "@/lib/api";
import { TESTIMONIAL_ENDPOINTS } from "../constants/endpoints";
import { TestimonialListResponse } from "../types/testimonial.types";

export interface GetTestimonialsQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  status?: string;
}

export async function getTestimonials(params: GetTestimonialsQuery): Promise<TestimonialListResponse> {
  const response = await apiClient.get<TestimonialListResponse>(
    TESTIMONIAL_ENDPOINTS.TESTIMONIALS,
    { params },
  );
  return response.data;
}
