import { z } from "zod";
import type { PageSectionType } from "@/modules/pages-section/validation/page-section.schema";
import type {
  SectionFieldComponent,
  ParseDefaultsFn,
} from "../types/section-content.types";

import { heroContentSchema, heroSettingsSchema } from "../schemas/hero.schema";
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
import { faqContentSchema } from "../schemas/faq.schema";
import { contactCtaContentSchema } from "../schemas/contact-cta.schema";
import { aboutHeroContentSchema } from "../schemas/about-hero.schema";
import { servicesHeroContentSchema } from "../schemas/services-hero.schema";
import { companyStatisticsContentSchema } from "../schemas/company-statistics.schema";
import { companyOverviewContentSchema } from "../schemas/company-overview.schema";
import { coreValuesContentSchema } from "../schemas/core-values.schema";
import { missionVisionContentSchema } from "../schemas/mission-vision.schema";
import { teamMembersContentSchema } from "../schemas/team-members.schema";

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
  parseFaqContentDefaults,
  ContactCtaContentForm,
  parseContactCtaContentDefaults,
} from "../components/forms";

import {
  AboutHeroContentForm,
  parseAboutHeroContentDefaults,
} from "../components/forms/about-hero-form";
import {
  ServicesHeroContentForm,
  parseServicesHeroContentDefaults,
} from "../components/forms/services-hero-form";
import {
  CompanyStatisticsContentForm,
  parseCompanyStatisticsContentDefaults,
} from "../components/forms/company-statistics-form";
import {
  CompanyOverviewContentForm,
  parseCompanyOverviewContentDefaults,
} from "../components/forms/company-overview-form";
import {
  CoreValuesContentForm,
  parseCoreValuesContentDefaults,
} from "../components/forms/core-values-form";
import {
  MissionVisionContentForm,
  parseMissionVisionContentDefaults,
} from "../components/forms/mission-vision-form";
import {
  TeamMembersContentForm,
  parseTeamMembersContentDefaults,
} from "../components/forms/team-members-form";

// ─── Content Registries ───────────────────────────────────────────────────────

export const SECTION_CONTENT_SCHEMA_MAP: Record<PageSectionType, z.ZodTypeAny> =
  {
    hero: heroContentSchema,
    about: aboutContentSchema,
    services: servicesContentSchema,
    "why-choose-us": whyChooseUsContentSchema,
    testimonials: testimonialsContentSchema,
    faq: faqContentSchema,
    "contact-cta": contactCtaContentSchema,
    "about-hero": aboutHeroContentSchema,
    "services-hero": servicesHeroContentSchema,
    "company-statistics": companyStatisticsContentSchema,
    "company-overview": companyOverviewContentSchema,
    "core-values": coreValuesContentSchema,
    "mission-vision": missionVisionContentSchema,
    "team-members": teamMembersContentSchema,
  };

export const SECTION_CONTENT_FORM_MAP: Record<
  PageSectionType,
  SectionFieldComponent
> = {
  hero: HeroContentForm,
  about: AboutContentForm,
  services: ServicesContentForm,
  "why-choose-us": WhyChooseUsContentForm,
  testimonials: TestimonialsContentForm,
  faq: FaqContentForm,
  "contact-cta": ContactCtaContentForm,
  "about-hero": AboutHeroContentForm,
  "services-hero": ServicesHeroContentForm,
  "company-statistics": CompanyStatisticsContentForm,
  "company-overview": CompanyOverviewContentForm,
  "core-values": CoreValuesContentForm,
  "mission-vision": MissionVisionContentForm,
  "team-members": TeamMembersContentForm,
};

export const SECTION_CONTENT_DEFAULTS_MAP: Record<
  PageSectionType,
  ParseDefaultsFn<unknown>
> = {
  hero: parseHeroContentDefaults,
  about: parseAboutContentDefaults,
  services: parseServicesContentDefaults,
  "why-choose-us": parseWhyChooseUsContentDefaults,
  testimonials: parseTestimonialsContentDefaults,
  faq: parseFaqContentDefaults,
  "contact-cta": parseContactCtaContentDefaults,
  "about-hero": parseAboutHeroContentDefaults,
  "services-hero": parseServicesHeroContentDefaults,
  "company-statistics": parseCompanyStatisticsContentDefaults,
  "company-overview": parseCompanyOverviewContentDefaults,
  "core-values": parseCoreValuesContentDefaults,
  "mission-vision": parseMissionVisionContentDefaults,
  "team-members": parseTeamMembersContentDefaults,
};

// ─── Settings Registries ──────────────────────────────────────────────────────

export const SECTION_SETTINGS_SCHEMA_MAP: Record<
  PageSectionType,
  z.ZodTypeAny
> = {
  hero: heroSettingsSchema,
  about: aboutSettingsSchema,
  services: servicesSettingsSchema,
  "why-choose-us": whyChooseUsSettingsSchema,
  testimonials: testimonialsSettingsSchema,
  faq: z.object({}),
  "contact-cta": z.object({}),
  "about-hero": z.object({}),
  "services-hero": z.object({}),
  "company-statistics": z.object({}),
  "company-overview": z.object({}),
  "core-values": z.object({}),
  "mission-vision": z.object({}),
  "team-members": z.object({}),
};

export const SECTION_SETTINGS_FORM_MAP: Record<
  PageSectionType,
  SectionFieldComponent
> = {
  hero: HeroSettingsForm,
  about: AboutSettingsForm,
  services: ServicesSettingsForm,
  "why-choose-us": WhyChooseUsSettingsForm,
  testimonials: TestimonialsSettingsForm,
  faq: () => null,
  "contact-cta": () => null,
  "about-hero": () => null,
  "services-hero": () => null,
  "company-statistics": () => null,
  "company-overview": () => null,
  "core-values": () => null,
  "mission-vision": () => null,
  "team-members": () => null,
};

export const SECTION_SETTINGS_DEFAULTS_MAP: Record<
  PageSectionType,
  ParseDefaultsFn<unknown>
> = {
  hero: parseHeroSettingsDefaults,
  about: parseAboutSettingsDefaults,
  services: parseServicesSettingsDefaults,
  "why-choose-us": parseWhyChooseUsSettingsDefaults,
  testimonials: parseTestimonialsSettingsDefaults,
  faq: () => ({}),
  "contact-cta": () => ({}),
  "about-hero": () => ({}),
  "services-hero": () => ({}),
  "company-statistics": () => ({}),
  "company-overview": () => ({}),
  "core-values": () => ({}),
  "mission-vision": () => ({}),
  "team-members": () => ({}),
};
