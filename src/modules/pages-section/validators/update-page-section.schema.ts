import { emptyStringToNull } from "@/shared/utils/validators/zod-helpers";
import { z } from "zod";

export const updatePageSectionSchema = z
  .object({
    sectionName: z
      .string()
      .trim()
      .min(1, "Section name is required")
      .max(100, "Section name must not exceed 100 characters")
      .regex(
        /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/,
        "Section name must start with a letter and contain only lowercase letters, numbers and hyphens",
      )
      .optional(),
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
