import { z } from "zod";
import {
  emptyStringToNull,
  nonNegativeInt,
  nullablePositiveInt,
} from "@/shared/utils/validators/zod-helpers";

export const testimonialSchema = z.object({
  clientName: z.string().trim().min(1, { message: "Client name is required" }),
  designation: emptyStringToNull(255).default(null),
  companyName: emptyStringToNull(255).default(null),
  profileImageId: nullablePositiveInt.default(null),
  title: emptyStringToNull(255).default(null),
  description: z.string().trim().min(1, { message: "Description is required" }),
  rating: z.number().int().min(1, { message: "Rating must be at least 1" }).max(5, { message: "Rating must be at most 5" }),
  status: z.enum(["draft", "published"]).default("draft"),
  sortOrder: nonNegativeInt.default(0),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
