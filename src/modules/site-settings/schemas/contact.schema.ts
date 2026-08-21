import { z } from "zod";
import { requiredString, optionalString, optionalUrl } from "@/features/page-sections/schemas/common.schema";

const formSettingsSchema = z.object({
  privacyNote: optionalString(500),
  successMessage: requiredString("Success Message"),
  redirectUrl: optionalUrl(),
});

const pageSettingsSchema = z.object({
  mapEmbedUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
});

export const contactSettingsSchema = z.object({
  form: formSettingsSchema,
  page: pageSettingsSchema,
});

export type ContactSettings = z.infer<typeof contactSettingsSchema>;

export const defaultContactSettings: ContactSettings = {
  form: {
    privacyNote: "Note: Your details are kept strictly confidential as per our Privacy Policy.",
    successMessage: "Thank you for getting in touch! We will get back to you within two business days.",
    redirectUrl: "",
  },
  page: {
    mapEmbedUrl: "",
  },
};
