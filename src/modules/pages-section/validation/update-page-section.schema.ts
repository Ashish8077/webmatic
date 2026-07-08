import { z } from "zod";

import {
  jsonObjectSchema,
  optionalJsonObjectSchema,
  pageSectionStatusSchema,
} from "./page-section.schema";

export const updatePageSectionSchema = z
  .object({
    content: jsonObjectSchema.optional(),

    settings: optionalJsonObjectSchema,

    sortOrder: z.coerce
      .number()
      .int({
        message: "Sort order must be an integer.",
      })
      .min(0, {
        message: "Sort order cannot be negative.",
      })
      .optional(),

    status: pageSectionStatusSchema.optional(),
  })
  .strict();

export type UpdatePageSectionInput = z.infer<typeof updatePageSectionSchema>;
