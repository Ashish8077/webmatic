import z from "zod";
import {
  pageSectionStatusSchema,
  pageSectionTypeSchema,
} from "./page-section.schema";
import {
  PAGE_SECTION_TYPES,
  SECTION_STATUS,
} from "@/modules/pages-section/constants/page-section.constants";
import {
  jsonStringSchema,
  optionalJsonStringSchema,
} from "@/shared/utils/validators/json-string";

const sortOrderSchema = z.preprocess(
  (value) => {
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      (typeof value === "number" && Number.isNaN(value))
    ) {
      return undefined;
    }

    if (typeof value === "string") {
      const parsedValue = Number(value);
      return Number.isNaN(parsedValue) ? value : parsedValue;
    }

    return value;
  },
  z
    .number({ error: "Sort order is required." })
    .int("Sort order must be an integer.")
    .min(0, { message: "Sort order cannot be negative." }),
);

export const pageSectionFormSchema = z.object({
  sectionType: pageSectionTypeSchema,
  content: jsonStringSchema,
  settings: optionalJsonStringSchema,
  sortOrder: sortOrderSchema,
  status: pageSectionStatusSchema,
});

export type PageSectionFormValues = z.infer<typeof pageSectionFormSchema>;

export const DEFAULT_PAGE_SECTION_FORM_VALUES: PageSectionFormValues = {
  sectionType: PAGE_SECTION_TYPES[0],
  content: "{}",
  settings: "",
  sortOrder: 0,
  status: SECTION_STATUS.DRAFT,
};
