import { GetTestimonialsQueryInput } from "../validation/get-testimonials-query.schema";
import { findTestimonials, countTestimonials } from "../repositories/testimonial.repository";
import { mapTestimonialRowToItem } from "../mapper/testimonial.mapper";
import { TestimonialListResponse } from "../types/service.types";

export async function getTestimonialsService(
  query: GetTestimonialsQueryInput,
): Promise<TestimonialListResponse> {
  const [rows, total] = await Promise.all([
    findTestimonials(query),
    countTestimonials(query),
  ]);

  const items = rows.map(mapTestimonialRowToItem);
  const totalPages = Math.ceil(total / query.limit);

  return {
    items,
    pagination: {
      totalItems: total,
      page: query.page,
      limit: query.limit,
      totalPages,
      hasNextPage: query.page < totalPages,
      hasPreviousPage: query.page > 1,
    },
  };
}
