import { emptyStringToNull } from "@/shared/utils/validators/zod-helpers";
import { z } from "zod";

export const updatePageSectionSchema = z
  .object({
    title: emptyStringToNull(255).optional(),
    content: z.record(z.string(), z.unknown()).optional(),
    sortOrder: z.coerce
      .number()
      .int("Sort order must be an integer")
      .min(0, "Sort order cannot be negative")
      .optional(),
    isActive: z.boolean().optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (Object.keys(data).length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "At least one field must be provided for update",
      });
    }
  });

export type UpdatePageSectionInput = z.infer<typeof updatePageSectionSchema>;
