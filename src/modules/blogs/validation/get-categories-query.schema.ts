import { paginationSchema } from "@/shared/schemas/pagination";
import { z } from "zod";

export const getCategoriesQuerySchema = paginationSchema
  .extend({
    sortBy: z
      .enum(["name", "slug", "created_at", "updated_at"])
      .default("updated_at"),
  })
  .strict();

export type GetCategoriesQuery = z.infer<typeof getCategoriesQuerySchema>;
