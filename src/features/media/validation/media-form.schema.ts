import { z } from "zod";

export const updateMediaSchema = z.object({
  altText: z.string().nullable().optional(),
  caption: z.string().nullable().optional(),
  folder: z.string().nullable().optional(),
});

export type UpdateMediaFormValues = z.infer<typeof updateMediaSchema>;
