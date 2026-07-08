import { z } from "zod";
import {
  PAGE_SECTION_TYPES,
  SECTION_STATUS,
} from "@/modules/pages-section/constants/page-section.constants";
import { nonNegativeInt } from "@/shared/utils/validators/zod-helpers";

export const pageSectionTypeSchema = z.enum(PAGE_SECTION_TYPES, {
  error: (issue) => {
    if (issue.input === undefined) {
      return "Section type is required.";
    }

    return "Invalid section type selected.";
  },
});

export const pageSectionStatusSchema = z.enum(SECTION_STATUS, {
  error: (issue) => {
    if (issue.input === undefined) {
      return "Status is required.";
    }

    return "Invalid status selected.";
  },
});

export const jsonObjectSchema = z
  .record(z.string(), z.unknown())
  .refine((value) => Object.keys(value).length > 0, {
    message: "Content is required.",
  });

export const optionalJsonObjectSchema = z.record(z.string(), z.unknown()).nullable().optional();

export const createPageSectionSchema = z.object({
  sectionType: pageSectionTypeSchema,

  content: jsonObjectSchema,

  settings: optionalJsonObjectSchema,

  sortOrder: nonNegativeInt.default(0),

  status: pageSectionStatusSchema.optional(),
});

export const updatePageSectionSchema = z.object({
  content: jsonObjectSchema.optional(),

  settings: optionalJsonObjectSchema,

  sortOrder: nonNegativeInt.optional(),

  status: pageSectionStatusSchema.optional(),
});

export type CreatePageSectionInput = z.infer<typeof createPageSectionSchema>;
export type UpdatePageSectionInput = z.infer<typeof updatePageSectionSchema>;

export const pageSectionFormSchema = z.object({
  sectionType: pageSectionTypeSchema,
  content: z.string().trim().min(1, { message: "Content is required." }),
  settings: z.string().trim().optional(),
  sortOrder: z
    .number()
    .int()
    .min(0, { message: "Sort order cannot be negative." }),
  status: pageSectionStatusSchema,
});

export type PageSectionFormValues = z.infer<typeof pageSectionFormSchema>;

export const DEFAULT_PAGE_SECTION_FORM_VALUES: PageSectionFormValues = {
  sectionType: PAGE_SECTION_TYPES[0],
  content: "{}",
  settings: "{}",
  sortOrder: 0,
  status: SECTION_STATUS.DRAFT,
};

export const stringifySectionContent = (content: unknown): string => {
  if (!content) return "{}";
  if (typeof content === "string") return content;
  try {
    return JSON.stringify(content, null, 2);
  } catch {
    return "{}";
  }
};

export const parseSectionContent = (content?: string | null): any => {
  if (!content || content.trim() === "") return null;
  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
};
