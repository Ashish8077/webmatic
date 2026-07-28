import { apiClient } from "@/lib/api";
import { TESTIMONIAL_ENDPOINTS } from "../constants/endpoints";
import { CreateTestimonialRequest, CreateTestimonialResponse } from "../types/testimonial.types";

export async function createTestimonial(data: CreateTestimonialRequest): Promise<CreateTestimonialResponse> {
  const response = await apiClient.post<CreateTestimonialResponse>(
    TESTIMONIAL_ENDPOINTS.TESTIMONIALS,
    data,
  );
  return response.data;
}
