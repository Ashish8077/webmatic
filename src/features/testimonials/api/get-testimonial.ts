import { apiClient } from "@/lib/api";
import { TESTIMONIAL_ENDPOINTS } from "../constants/endpoints";
import { GetTestimonialResponse } from "../types/testimonial.types";

export async function getTestimonial(id: number): Promise<GetTestimonialResponse> {
  const response = await apiClient.get<GetTestimonialResponse>(
    TESTIMONIAL_ENDPOINTS.TESTIMONIAL(id),
  );
  return response.data;
}
