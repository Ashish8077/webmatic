import { z } from "zod";
import {
  requiredString,
  optionalString,
  buttonSchema,
  optionalButtonSchema,
  imageIdSchema,
} from "./common.schema";


// ─── Service item schema ──────────────────────────────────────────────────────

const serviceItemSchema = z.object({
  key: requiredString("Key"),
  title: requiredString("Title"),
  description: optionalString(1000),
  imageId: imageIdSchema,
  button: optionalButtonSchema,
});

// ─── Services content schema ──────────────────────────────────────────────────

export const servicesContentSchema = z.object({
  badge: requiredString("Badge"),
  heading: requiredString("Heading"),
  highlight: optionalString(),
  viewAllButton: optionalButtonSchema,
  services: z.array(serviceItemSchema),
  bottomText: optionalString(500),
  primaryButton: buttonSchema,
});

export type ServicesContentValues = z.infer<typeof servicesContentSchema>;

export const DEFAULT_SERVICES_CONTENT: ServicesContentValues = {
  badge: "",
  heading: "",
  highlight: "",
  viewAllButton: { text: "", url: "" },
  services: [],
  bottomText: "",
  primaryButton: { text: "", url: "" },
};

// ─── Services settings schema ─────────────────────────────────────────────────

export const servicesSettingsSchema = z.object({});

export type ServicesSettingsValues = z.infer<typeof servicesSettingsSchema>;

export const DEFAULT_SERVICES_SETTINGS: ServicesSettingsValues = {};
