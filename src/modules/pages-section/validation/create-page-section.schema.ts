import { z } from "zod";
import {
  jsonObjectSchema,
  optionalJsonObjectSchema,
  pageSectionStatusSchema,
  pageSectionTypeSchema,
} from "./page-section.schema";

export const createPageSectionSchema = z.object({
  sectionType: pageSectionTypeSchema,

  content: jsonObjectSchema,

  settings: optionalJsonObjectSchema,

  sortOrder: z
    .number()
    .int({ message: "Sort order must be an integer." })
    .min(0, {
      message: "Sort order cannot be negative.",
    })
    .default(0),

  status: pageSectionStatusSchema.optional(),
});

export type CreatePageSectionInput = z.infer<typeof createPageSectionSchema>;
