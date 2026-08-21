import {
  emptyStringToNull,
  nonNegativeInt,
  nullablePositiveInt,
} from "@/shared/utils/validators/zod-helpers";
import { z } from "zod";
import { TESTIMONIAL_STATUS } from "../constants/testimonial.constants";

export const createTestimonialSchema = z.object({
  clientName: z.string().trim().min(1, "Client name is required"),
  designation: emptyStringToNull(255).default(null),
  companyName: emptyStringToNull(255).default(null),
  profileImageId: nullablePositiveInt.default(null),
  profileImage: z.any().nullable().optional(),
  title: emptyStringToNull(255).default(null),
  description: z.string().trim().min(1, "Description is required"),
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  status: z.enum([TESTIMONIAL_STATUS.DRAFT, TESTIMONIAL_STATUS.PUBLISHED]).default(TESTIMONIAL_STATUS.DRAFT),
  sortOrder: nonNegativeInt.default(0),
});

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
