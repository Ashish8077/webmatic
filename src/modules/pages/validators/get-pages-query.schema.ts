import z from "zod";

export const getPagesQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),

    pageSize: z.coerce.number().int().min(1).max(100).default(20),

    search: z.preprocess((value) => {
      if (typeof value !== "string") return value;

      const trimmed = value.trim();
      return trimmed === "" ? undefined : trimmed;
    }, z.string().optional()),

    status: z.enum(["draft", "published"]).optional(),

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
