import { z } from "zod";
import { requiredString, optionalString} from "@/features/page-sections/schemas/common.schema";

const headerLogoSchema = z.object({
  imageId: z.number().int().positive().nullable(),
  image: z.any().optional(), // For frontend rendering in MediaField
  altText: optionalString(255),
});

const headerContactInfoSchema = z.object({
  phone: z.object({
    number: requiredString("Phone Number"),
    url: optionalString(255),
  }),
  email: z.object({
    address: requiredString("Email Address").email(),
    url: optionalString(255),
  })
});

const headerSocialLinkSchema = z.object({
  platform: requiredString("Platform"),
  url: requiredString("URL"),
  enabled: z.boolean(),
});

const headerCtaSchema = z.object({
  label: requiredString("Button Text"),
  destinationType: z.enum(["page", "service", "external", "none"]).default("page"),
  referenceId: z.number().nullable().optional(),
  url: z.string().nullable().optional(),
}).superRefine((data, ctx) => {
  if (data.destinationType === "page" || data.destinationType === "service") {
    if (!data.referenceId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Target ${data.destinationType} is required`,
        path: ["referenceId"],
      });
    }
  }

  if (data.destinationType === "external") {
    if (!data.url) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "URL is required",
        path: ["url"],
      });
    }
  }
});

const headerVisibilitySchema = z.object({
  topBar: z.boolean().default(true),
  phone: z.boolean().default(true),
  email: z.boolean().default(true),
  social: z.boolean().default(true),
});

export const headerSettingsSchema = z.object({
  logo: headerLogoSchema,
  contactInfo: headerContactInfoSchema,
  socialLinks: z.array(headerSocialLinkSchema),
  cta: headerCtaSchema,
  visibility: headerVisibilitySchema,
});
