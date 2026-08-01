import { z } from "zod";
import { SECTION_STATUS } from "@/modules/pages-section/constants/page-section.constants";

import { nonNegativeInt } from "@/shared/utils/validators/zod-helpers";
import { PAGE_SECTION_TYPES } from "@/modules/pages-section/constants/page-section-types";
// Page section type schema with custom error messages
export const pageSectionTypeSchema = z.enum(PAGE_SECTION_TYPES, {
  error: (issue) => {
    if (issue.input === undefined) {
      return "Section type is required.";
    }

    return "Invalid section type selected.";
  },
});

// Page section status schema with custom error messages
export const pageSectionStatusSchema = z.enum(
  [SECTION_STATUS.DRAFT, SECTION_STATUS.PUBLISHED],
  {
    error: "Invalid status selected.",
  },
);

// JSON object schema with custom error message for empty object
export const jsonObjectSchema = z
  .record(z.string(), z.unknown())
  .refine((value) => Object.keys(value).length > 0, {
    message: "Content is required.",
  });

// Optional JSON object schema
export const optionalJsonObjectSchema = z
  .record(z.string(), z.unknown())
  .nullable()
  .optional();

// Create page section schema
export const createPageSectionSchema = z.object({
  sectionType: pageSectionTypeSchema,

  content: jsonObjectSchema,

  settings: optionalJsonObjectSchema,

  sortOrder: nonNegativeInt.optional(),

  status: pageSectionStatusSchema.optional(),
});

// Update page section schema
export const updatePageSectionSchema = z.object({
  content: jsonObjectSchema.optional(),

  settings: optionalJsonObjectSchema,

  sortOrder: nonNegativeInt.optional(),

  status: pageSectionStatusSchema.optional(),
});

export type CreatePageSectionInput = z.infer<typeof createPageSectionSchema>;
export type UpdatePageSectionInput = z.infer<typeof updatePageSectionSchema>;
