import { z } from "zod";
import {
  requiredString,
  optionalString,
  imageIdSchema,
} from "./common.schema";
import { numberSetting } from "./common-settings.schema";

// ─── Company Statistics Item Schema ─────────────────────────────────────────────

const companyStatisticsItemSchema = z.object({
  number: requiredString("Number"),
  suffix: optionalString(50),
  title: requiredString("Title"),
  description: optionalString(500),
  iconId: imageIdSchema, // Optional icon from Media Library
  sortOrder: numberSetting(0, 1000).default(0),
});

// ─── Company Statistics Content Schema ────────────────────────────────────────

export const companyStatisticsContentSchema = z.object({
  items: z.array(companyStatisticsItemSchema),
});

export type CompanyStatisticsContentValues = z.infer<
  typeof companyStatisticsContentSchema
>;

export const DEFAULT_COMPANY_STATISTICS_CONTENT: CompanyStatisticsContentValues = {
  items: [],
};
