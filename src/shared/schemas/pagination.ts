// shared/schemas/pagination.ts

import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  search: z.preprocess((value) => {
    if (typeof value !== "string") return value;

    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  }, z.string().optional()),

  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
