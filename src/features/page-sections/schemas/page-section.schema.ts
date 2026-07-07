import { z } from "zod";
import type { JsonObject, JsonValue } from "@/shared/types/json";
import { PAGE_SECTION_TYPES } from "@/modules/pages-section/constants/page-section.constants";

const isJsonObject = (value: unknown): value is JsonObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const jsonObjectSuperRefine = (value: string | undefined, ctx: z.RefinementCtx) => {
  if (!value || value.trim() === "") return;

  try {
    const parsed = JSON.parse(value) as unknown;

    if (!isJsonObject(parsed)) {
      ctx.addIssue({
        code: "custom",
        message: "Must be a JSON object",
      });
    }
  } catch {
    ctx.addIssue({
      code: "custom",
      message: "Must be valid JSON",
    });
  }
};

export const pageSectionFormSchema = z.object({
  sectionType: z.enum(PAGE_SECTION_TYPES, {
    message: "Invalid section type",
  }),
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .superRefine(jsonObjectSuperRefine),
  settings: z
    .string()
    .trim()
    .optional()
    .superRefine(jsonObjectSuperRefine),
  sortOrder: z
    .number()
    .int("Sort order must be an integer")
    .min(0, "Sort order cannot be negative"),
  status: z.enum(["draft", "published"]),
});

export type PageSectionFormValues = z.infer<typeof pageSectionFormSchema>;

export const DEFAULT_PAGE_SECTION_FORM_VALUES: PageSectionFormValues = {
  sectionType: "hero",
  content: "{}",
  settings: "{}",
  sortOrder: 0,
  status: "draft",
};

export function parseSectionContent(content: string | undefined | null): JsonObject | null {
  if (!content || content.trim() === "") return null;
  const parsed = JSON.parse(content) as unknown;

  if (!isJsonObject(parsed)) {
    throw new Error("Must be a JSON object.");
  }

  return parsed;
}

export function stringifySectionContent(content: JsonValue | undefined | null): string {
  if (content === null || content === undefined) return "";
  return JSON.stringify(content, null, 2);
}
