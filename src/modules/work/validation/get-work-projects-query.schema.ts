import { z } from "zod";
import { WORK_CATEGORIES } from "../constants/work.constants";

export const getWorkProjectsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.enum(["draft", "published"]).optional(),
  category: z.enum(WORK_CATEGORIES).optional(),
  isFeatured: z.coerce.boolean().optional(),
  sortBy: z
    .enum(["title", "slug", "status", "category", "sort_order", "created_at", "updated_at", "published_at"])
    .default("created_at"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type GetWorkProjectsQuery = z.infer<typeof getWorkProjectsQuerySchema>;
