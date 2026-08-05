import { z } from "zod";
import { BLOG_STATUS } from "../constants/blog.constants";

export const updateBlogStatusSchema = z.object({
  status: z.enum([BLOG_STATUS.DRAFT, BLOG_STATUS.PUBLISHED, BLOG_STATUS.SCHEDULED]),
});

export type UpdateBlogStatusInput = z.infer<typeof updateBlogStatusSchema>;
