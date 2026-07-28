import {
  emptyStringToNull,
  nonNegativeInt,
  nullablePositiveInt,
} from "@/shared/utils/validators/zod-helpers";
import { z } from "zod";
import { TESTIMONIAL_STATUS } from "../constants/testimonial.constants";

export const updateTestimonialSchema = z
  .object({
    clientName: z.string().trim().min(1, "Client name is required").optional(),
    designation: emptyStringToNull(255).optional(),
    companyName: emptyStringToNull(255).optional(),
    profileImageId: nullablePositiveInt.optional(),
    title: emptyStringToNull(255).optional(),
    description: z.string().trim().min(1, "Description is required").optional(),
    rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5").optional(),
    status: z.enum([TESTIMONIAL_STATUS.DRAFT, TESTIMONIAL_STATUS.PUBLISHED]).optional(),
    sortOrder: nonNegativeInt.optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
