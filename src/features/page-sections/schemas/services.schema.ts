import { z } from "zod";
import {
  requiredString,
  optionalString,
  optionalButtonSchema,
} from "./common.schema";


// ─── Services content schema ──────────────────────────────────────────────────

export const servicesContentSchema = z.object({
  badge: requiredString("Badge"),
  heading: requiredString("Heading"),
  highlight: optionalString(),
  viewAllButton: optionalButtonSchema,
  bottomText: optionalString(500),
  primaryButton: optionalButtonSchema,
});

export type ServicesContentValues = z.infer<typeof servicesContentSchema>;

export const DEFAULT_SERVICES_CONTENT: ServicesContentValues = {
  badge: "",
  heading: "",
  highlight: "",
  viewAllButton: { text: "", url: "" },
  bottomText: "",
  primaryButton: { text: "", url: "" },
};

// ─── Services settings schema ─────────────────────────────────────────────────

export const servicesSettingsSchema = z.object({});

export type ServicesSettingsValues = z.infer<typeof servicesSettingsSchema>;

export const DEFAULT_SERVICES_SETTINGS: ServicesSettingsValues = {};
