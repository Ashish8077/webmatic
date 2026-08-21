import { z } from "zod";

const positiveIdSchema = z.coerce
  .number({
    error: "ID must be a valid number",
  })
  .int("ID must be an integer")
  .positive("ID must be greater than 0");

export const idParamSchema = z.object({
  id: positiveIdSchema,
});

export const pageSectionParamsSchema = z.object({
  pageId: positiveIdSchema,
  sectionId: positiveIdSchema,
});
