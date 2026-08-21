import { z } from "zod";
import { requiredString, optionalString, optionalUrl } from "@/features/page-sections/schemas/common.schema";

const footerHeroCtaSchema = z.object({
  heading: requiredString("Heading"),
  highlightedText: requiredString("Highlighted Text"),
  description: requiredString("Description"),
  buttonText: requiredString("Button Text"),
  buttonUrl: optionalUrl(),
});

const footerPhoneSchema = z.object({
  label: requiredString("Label"),
  number: requiredString("Number"),
});

const footerContactInfoSchema = z.object({
  phone: z.object({
    title: requiredString("Phone Title"),
    phones: z.array(footerPhoneSchema),
  }),
  email: z.object({
    title: requiredString("Email Title"),
    subtitle: optionalString(255),
    email: requiredString("Email Address").email(),
  }),
});

const footerSocialLinkSchema = z.object({
  platform: requiredString("Platform"),
  url: optionalUrl(),
  enabled: z.boolean(),
});

const footerCopyrightSchema = z.object({
  companyName: requiredString("Company Name"),
  autoYear: z.boolean(),
});

export const footerSettingsSchema = z.object({
  heroCta: footerHeroCtaSchema,
  contactInfo: footerContactInfoSchema,
  socialLinks: z.array(footerSocialLinkSchema),
  copyright: footerCopyrightSchema,
});
