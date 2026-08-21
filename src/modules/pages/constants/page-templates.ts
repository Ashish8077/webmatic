import { z } from "zod";

export const SYSTEM_PAGE_TEMPLATES = [
  "home",
  "about",
  "contact",
  "service-list",
  "blog-list",
] as const;

export const CUSTOM_PAGE_TEMPLATES = ["default"] as const;

export const PAGE_TEMPLATES = [
  ...CUSTOM_PAGE_TEMPLATES,
  ...SYSTEM_PAGE_TEMPLATES,
] as const;

export const pageTemplateSchema = z.enum(PAGE_TEMPLATES);

export const customPageTemplateSchema = z.enum(CUSTOM_PAGE_TEMPLATES);

export type PageTemplate = z.infer<typeof pageTemplateSchema>;
export type CustomPageTemplate = z.infer<typeof customPageTemplateSchema>;
