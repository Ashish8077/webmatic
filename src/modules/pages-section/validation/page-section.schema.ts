import { HOME_SECTION_TYPES } from "@/modules/home/constants/home-section-types";
import { z } from "zod";

export const jsonObjectSchema = z
  .record(z.string(), z.unknown())
  .refine((value) => Object.keys(value).length > 0, {
    message: "Content is required.",
  });

export const optionalJsonObjectSchema = z
  .record(z.string(), z.unknown())
  .nullable()
  .optional();

export const pageSectionTypeSchema = z.enum(HOME_SECTION_TYPES);

export const pageSectionStatusSchema = z.enum(["draft", "published"]);

export type PageSectionType = z.infer<typeof pageSectionTypeSchema>;

export type PageSectionStatus = z.infer<typeof pageSectionStatusSchema>;

export type JsonObject = z.infer<typeof jsonObjectSchema>;
