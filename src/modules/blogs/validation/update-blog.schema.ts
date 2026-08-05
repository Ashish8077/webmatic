import { createBlogSchema } from "./create-blog.schema";
import { z } from "zod";

export const updateBlogSchema = createBlogSchema.partial();

export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
