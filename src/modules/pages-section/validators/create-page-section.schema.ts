import { emptyStringToNull } from "@/shared/utils/validators/zod-helpers";
import { z } from "zod";

export const createPageSectionSchema = z.object({
  sectionName: z
    .string()
    .trim()
    .min(1, "Section name is required")
    .max(100, "Section name must not exceed 100 characters")
    .regex(
      /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/,
      "Section name must start with a letter and contain only lowercase letters, numbers and hyphens",
    ),
  title: emptyStringToNull(255).optional(),
  content: z.record(z.string(), z.unknown()),
  sortOrder: z.coerce
    .number()
    .int("Sort order must be an integer")
    .min(0, "Sort order cannot be negative")
    .default(0),
  isActive: z.boolean().default(true),
});

export type CreatePageSectionInput = z.infer<typeof createPageSectionSchema>;

export default createPageSectionSchema;
