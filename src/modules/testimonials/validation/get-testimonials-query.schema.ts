import { paginationSchema } from "@/shared/schemas/pagination";
import { z } from "zod";
import { TESTIMONIAL_STATUS } from "../constants/testimonial.constants";

export const getTestimonialsQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  status: z.nativeEnum(TESTIMONIAL_STATUS).optional(),
  sortBy: z
    .enum(["client_name", "rating", "created_at", "updated_at", "published_at", "sort_order"])
    .optional()
    .default("sort_order"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
});

export type GetTestimonialsQueryInput = z.infer<typeof getTestimonialsQuerySchema>;
