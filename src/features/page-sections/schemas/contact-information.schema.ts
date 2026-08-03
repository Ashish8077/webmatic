import { z } from "zod";
import { requiredString, optionalString } from "./common.schema";
import { visualAssetSchema } from "@/shared/schemas/visual-asset.schema";

const contactInfoItemSchema = z.object({
  title: requiredString("Title"),
  value: requiredString("Value"),
  visualType: visualAssetSchema.shape.visualType,
  iconName: visualAssetSchema.shape.iconName,
  imageId: visualAssetSchema.shape.imageId,
  image: z.any().nullable().optional(),
  href: optionalString(),
  openInNewTab: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export const contactInformationContentSchema = z.object({
  items: z.array(contactInfoItemSchema),
});

export type ContactInformationContentValues = z.infer<typeof contactInformationContentSchema>;

export const DEFAULT_CONTACT_INFORMATION_CONTENT: ContactInformationContentValues = {
  items: [
    {
      title: "",
      value: "",
      visualType: "icon",
      iconName: "MapPin",
      imageId: null,
      href: "",
      openInNewTab: false,
      sortOrder: 0,
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
