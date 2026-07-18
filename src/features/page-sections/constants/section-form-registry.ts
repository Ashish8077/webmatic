import type { z } from "zod";
import type { PageSectionType } from "@/modules/pages-section/validation/page-section.schema";
import type {
  SectionFieldComponent,
  ParseDefaultsFn,
} from "../types/section-content.types";

import {
  heroContentSchema,
  heroSettingsSchema,
} from "../schemas/hero.schema";
import {
  aboutContentSchema,
  aboutSettingsSchema,
} from "../schemas/about.schema";
import {
  servicesContentSchema,
  servicesSettingsSchema,
} from "../schemas/services.schema";
import {
  whyChooseUsContentSchema,
  whyChooseUsSettingsSchema,
} from "../schemas/why-choose-us.schema";
import {
  testimonialsContentSchema,
  testimonialsSettingsSchema,
} from "../schemas/testimonials.schema";
import { faqContentSchema, faqSettingsSchema } from "../schemas/faq.schema";
import {
  contactCtaContentSchema,
  contactCtaSettingsSchema,
} from "../schemas/contact-cta.schema";

import {
  HeroContentForm,
  HeroSettingsForm,
  parseHeroContentDefaults,
  parseHeroSettingsDefaults,
  AboutContentForm,
  AboutSettingsForm,
  parseAboutContentDefaults,
  parseAboutSettingsDefaults,
  ServicesContentForm,
  ServicesSettingsForm,
  parseServicesContentDefaults,
  parseServicesSettingsDefaults,
  WhyChooseUsContentForm,
  WhyChooseUsSettingsForm,
  parseWhyChooseUsContentDefaults,
  parseWhyChooseUsSettingsDefaults,
  TestimonialsContentForm,
  TestimonialsSettingsForm,
  parseTestimonialsContentDefaults,
  parseTestimonialsSettingsDefaults,
  FaqContentForm,
  FaqSettingsForm,
  parseFaqContentDefaults,
  parseFaqSettingsDefaults,
  ContactCtaContentForm,
  ContactCtaSettingsForm,
  parseContactCtaContentDefaults,
  parseContactCtaSettingsDefaults,
} from "../components/forms";

// ─── Content Registries ───────────────────────────────────────────────────────

export const SECTION_CONTENT_SCHEMA_MAP: Record<PageSectionType, z.ZodTypeAny> = {
  hero: heroContentSchema,
  about: aboutContentSchema,
  services: servicesContentSchema,
  "why-choose-us": whyChooseUsContentSchema,
  testimonials: testimonialsContentSchema,
  faq: faqContentSchema,
  "contact-cta": contactCtaContentSchema,
};

export const SECTION_CONTENT_FORM_MAP: Record<PageSectionType, SectionFieldComponent> = {
  hero: HeroContentForm,
  about: AboutContentForm,
  services: ServicesContentForm,
  "why-choose-us": WhyChooseUsContentForm,
  testimonials: TestimonialsContentForm,
  faq: FaqContentForm,
  "contact-cta": ContactCtaContentForm,
};

export const SECTION_CONTENT_DEFAULTS_MAP: Record<PageSectionType, ParseDefaultsFn<any>> = {
  hero: parseHeroContentDefaults,
  about: parseAboutContentDefaults,
  services: parseServicesContentDefaults,
  "why-choose-us": parseWhyChooseUsContentDefaults,
  testimonials: parseTestimonialsContentDefaults,
  faq: parseFaqContentDefaults,
  "contact-cta": parseContactCtaContentDefaults,
};

// ─── Settings Registries ──────────────────────────────────────────────────────

export const SECTION_SETTINGS_SCHEMA_MAP: Record<PageSectionType, z.ZodTypeAny> = {
  hero: heroSettingsSchema,
  about: aboutSettingsSchema,
  services: servicesSettingsSchema,
  "why-choose-us": whyChooseUsSettingsSchema,
  testimonials: testimonialsSettingsSchema,
  faq: faqSettingsSchema,
  "contact-cta": contactCtaSettingsSchema,
};

export const SECTION_SETTINGS_FORM_MAP: Record<PageSectionType, SectionFieldComponent> = {
  hero: HeroSettingsForm,
  about: AboutSettingsForm,
  services: ServicesSettingsForm,
  "why-choose-us": WhyChooseUsSettingsForm,
  testimonials: TestimonialsSettingsForm,
  faq: FaqSettingsForm,
  "contact-cta": ContactCtaSettingsForm,
};

export const SECTION_SETTINGS_DEFAULTS_MAP: Record<PageSectionType, ParseDefaultsFn<any>> = {
  hero: parseHeroSettingsDefaults,
  about: parseAboutSettingsDefaults,
  services: parseServicesSettingsDefaults,
  "why-choose-us": parseWhyChooseUsSettingsDefaults,
  testimonials: parseTestimonialsSettingsDefaults,
  faq: parseFaqSettingsDefaults,
  "contact-cta": parseContactCtaSettingsDefaults,
};
