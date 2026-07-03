import { emptyStringToNull } from "@/shared/utils/validators/zod-helpers";
import { z } from "zod";
import { HOME_SECTION_TYPES } from "@/shared/constants/section-types";

export const createPageSectionSchema = z.object({
  sectionType: z.enum(HOME_SECTION_TYPES, {
    message: "Invalid section type",
  }),
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
