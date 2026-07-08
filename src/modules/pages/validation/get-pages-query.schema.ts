import { paginationSchema } from "@/shared/schemas/pagination";
import z from "zod";
import { PAGE_STATUS } from "../constants/page.constants";

export const getPagesQuerySchema = paginationSchema
  .extend({
    status: z.enum(PAGE_STATUS).optional(),

    sortBy: z
      .enum([
        "title",
        "slug",
        "status",
        "created_at",
        "updated_at",
        "published_at",
      ])
      .default("updated_at"),

    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .strict();

export type GetPagesQuery = z.infer<typeof getPagesQuerySchema>;
