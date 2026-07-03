import { z } from "zod";
import type { JsonObject, JsonValue } from "@/shared/types/json";
import { HOME_SECTION_TYPES } from "@/shared/constants/section-types";

const isJsonObject = (value: unknown): value is JsonObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const pageSectionFormSchema = z.object({
  sectionType: z.enum(HOME_SECTION_TYPES, {
    message: "Invalid section type",
  }),
  title: z.string().trim().max(255, "Title cannot exceed 255 characters"),
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .superRefine((value, ctx) => {
      if (!value) return;

      try {
        const parsed = JSON.parse(value) as unknown;

        if (!isJsonObject(parsed)) {
          ctx.addIssue({
            code: "custom",
            message: "Content must be a JSON object",
          });
        }
      } catch {
        ctx.addIssue({
          code: "custom",
          message: "Content must be valid JSON",
        });
      }
    }),
  sortOrder: z
    .number()
    .int("Sort order must be an integer")
    .min(0, "Sort order cannot be negative"),
  isActive: z.boolean(),
});

export type PageSectionFormValues = z.infer<typeof pageSectionFormSchema>;

export const DEFAULT_PAGE_SECTION_FORM_VALUES: PageSectionFormValues = {
  sectionType: "hero",
  title: "",
  content: "{}",
  sortOrder: 0,
  isActive: true,
};

export function parseSectionContent(content: string): JsonObject {
  const parsed = JSON.parse(content) as unknown;

  if (!isJsonObject(parsed)) {
    throw new Error("Section content must be a JSON object.");
  }

  return parsed;
}

export function stringifySectionContent(content: JsonValue): string {
  return JSON.stringify(content ?? {}, null, 2);
}
