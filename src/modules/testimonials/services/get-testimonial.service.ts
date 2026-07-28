import { findTestimonialById } from "../repositories/testimonial.repository";
import { mapTestimonialRowToItem } from "../mapper/testimonial.mapper";
import { TestimonialItem } from "../types/service.types";
import { AppError } from "@/shared/utils/errors/app-error";

export async function getTestimonialService(
  id: number,
): Promise<TestimonialItem> {
  const row = await findTestimonialById(id);

  if (!row) {
    throw new AppError("Testimonial not found", 404);
  }

  return mapTestimonialRowToItem(row);
}
