import { z } from "zod";
import { requiredString, optionalString, optionalUrl } from "@/features/page-sections/schemas/common.schema";

const footerBrandSchema = z.object({
  name: requiredString("Brand Name"),
  logoType: z.enum(["text", "media"]),
  logoText: optionalString(255),
  mediaId: z.number().nullable().optional(),
  fontWeight: requiredString("Font Weight"),
  fontSize: requiredString("Font Size"),
  tracking: requiredString("Tracking"),
});

const footerTrustedBrandsSchema = z.object({
  enabled: z.boolean(),
  title: requiredString("Title"),
  ctaText: requiredString("CTA Text"),
  ctaUrl: optionalUrl(),
  brands: z.array(footerBrandSchema),
});

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
  trustedBrands: footerTrustedBrandsSchema,
  heroCta: footerHeroCtaSchema,
  contactInfo: footerContactInfoSchema,
  socialLinks: z.array(footerSocialLinkSchema),
  copyright: footerCopyrightSchema,
});
