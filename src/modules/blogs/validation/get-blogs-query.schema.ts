import { paginationSchema } from "@/shared/schemas/pagination";
import { z } from "zod";
import { BLOG_STATUS } from "../constants/blog.constants";

export const getBlogsQuerySchema = paginationSchema
  .extend({
    status: z.enum(BLOG_STATUS).optional(),

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
      
    categoryId: z.coerce.number().int().positive().optional(),
    tagId: z.coerce.number().int().positive().optional(),
    authorId: z.coerce.number().int().positive().optional(),
  })
  .strict();

export type GetBlogsQuery = z.infer<typeof getBlogsQuerySchema>;
