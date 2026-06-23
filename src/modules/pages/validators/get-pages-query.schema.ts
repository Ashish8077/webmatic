import z from "zod";

export const getPagesQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(20),

    search: z.string().trim().min(1).optional(),

    status: z.enum(["draft", "published"]).optional(),

    sortBy: z
      .enum(["title", "created_at", "published_at"])
      .default("created_at"),

    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .strict();

export type GetPagesQuery = z.infer<typeof getPagesQuerySchema>;
