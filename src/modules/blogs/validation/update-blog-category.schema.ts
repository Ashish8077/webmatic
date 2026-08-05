import { createBlogCategorySchema } from "./create-blog-category.schema";
import { z } from "zod";

export const updateBlogCategorySchema = createBlogCategorySchema.partial();

export type UpdateBlogCategoryInput = z.infer<typeof updateBlogCategorySchema>;
