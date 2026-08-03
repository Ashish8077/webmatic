import { z } from "zod";

export const reorderMenuItemSchema = z.array(
  z.object({
    id: z.number().int().positive(),
    parentId: z.number().int().positive().nullable(),
    sortOrder: z.number().int(),
  })
);

export type ReorderMenuItemDTO = z.infer<typeof reorderMenuItemSchema>;
