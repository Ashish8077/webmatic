import { z } from "zod";
import { requiredString, optionalString } from "./common.schema";

const iconSchema = z.object({
  type: requiredString("Icon Type"),
  value: requiredString("Icon Value"),
});

const contactInfoItemSchema = z.object({
  label: requiredString("Label"),
  value: requiredString("Value"),
  icon: iconSchema,
  href: optionalString(),
  openInNewTab: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const contactInformationContentSchema = z.object({
  items: z.array(contactInfoItemSchema),
});

export type ContactInformationContentValues = z.infer<typeof contactInformationContentSchema>;

export const DEFAULT_CONTACT_INFORMATION_CONTENT: ContactInformationContentValues = {
  items: [
    {
      label: "",
      value: "",
      icon: { type: "lucide", value: "MapPin" },
      href: "",
      openInNewTab: false,
      order: 0,
    },
  ],
};

export const contactInformationSettingsSchema = z.object({
  container: z.string().default("default"),
  background: z.string().default("white"),
  paddingTop: z.string().default("xl"),
  paddingBottom: z.string().default("xl"),
});

export type ContactInformationSettingsValues = z.infer<typeof contactInformationSettingsSchema>;

export const DEFAULT_CONTACT_INFORMATION_SETTINGS: ContactInformationSettingsValues = {
  container: "default",
  background: "white",
  paddingTop: "xl",
  paddingBottom: "xl",
};
