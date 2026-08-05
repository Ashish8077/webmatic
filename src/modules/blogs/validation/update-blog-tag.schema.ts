import { createBlogTagSchema } from "./create-blog-tag.schema";
import { z } from "zod";

export const updateBlogTagSchema = createBlogTagSchema.partial();

export type UpdateBlogTagInput = z.infer<typeof updateBlogTagSchema>;
