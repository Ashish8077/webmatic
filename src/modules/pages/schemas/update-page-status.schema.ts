import { z } from "zod";

export const updatePageStatusSchema = z.object({
  status: z.enum(["draft", "published"]),
});

export type UpdatePageStatusInput = z.infer<typeof updatePageStatusSchema>;
