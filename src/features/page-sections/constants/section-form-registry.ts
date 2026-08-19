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
import {
  contactInformationContentSchema,
  contactInformationSettingsSchema,
} from "../schemas/contact-information.schema";
import { contactCtaContentSchema, contactCtaSettingsSchema } from "../schemas/contact-cta.schema";
import { aboutHeroContentSchema } from "../schemas/about-hero.schema";
import { servicesHeroContentSchema } from "../schemas/services-hero.schema";
import { companyStatisticsContentSchema } from "../schemas/company-statistics.schema";
import { companyOverviewContentSchema } from "../schemas/company-overview.schema";
import { coreValuesContentSchema } from "../schemas/core-values.schema";
import { missionVisionContentSchema } from "../schemas/mission-vision.schema";
import { teamMembersContentSchema } from "../schemas/team-members.schema";
import { developmentProcessContentSchema } from "../schemas/development-process.schema";
import { blogListContentSchema, blogListSettingsSchema } from "../schemas/blog-list.schema";
import {
  portfolioContentSchema,
  portfolioSettingsSchema,
  parsePortfolioContentDefaults,
  parsePortfolioSettingsDefaults,
} from "../schemas/portfolio.schema";

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
  ContactCtaSettingsForm,
  parseContactCtaContentDefaults,
  parseContactCtaSettingsDefaults,
  ContactInformationContentForm,
  ContactInformationSettingsForm,
  parseContactInformationContentDefaults,
  parseContactInformationSettingsDefaults,
  BlogListContentForm,
  BlogListSettingsForm,
  PortfolioContentForm,
  PortfolioSettingsForm,
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
import {
  DevelopmentProcessContentForm,
  parseDevelopmentProcessContentDefaults,
} from "../components/forms/development-process-form";
import { parseBlogListContentDefaults, parseBlogListSettingsDefaults } from "../schemas/blog-list.schema";

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
    "contact-information": contactInformationContentSchema,
    "about-hero": aboutHeroContentSchema,
    "services-hero": servicesHeroContentSchema,
    "development-process": developmentProcessContentSchema,
    "company-statistics": companyStatisticsContentSchema,
    "company-overview": companyOverviewContentSchema,
    "core-values": coreValuesContentSchema,
    "mission-vision": missionVisionContentSchema,
    "team-members": teamMembersContentSchema,
    "blog-list": blogListContentSchema,
    portfolio: portfolioContentSchema,
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
  "contact-information": ContactInformationContentForm,
  "about-hero": AboutHeroContentForm,
  "services-hero": ServicesHeroContentForm,
  "development-process": DevelopmentProcessContentForm,
  "company-statistics": CompanyStatisticsContentForm,
  "company-overview": CompanyOverviewContentForm,
  "core-values": CoreValuesContentForm,
  "mission-vision": MissionVisionContentForm,
  "team-members": TeamMembersContentForm,
  "blog-list": BlogListContentForm,
  portfolio: PortfolioContentForm,
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
  "contact-information": parseContactInformationContentDefaults,
  "about-hero": parseAboutHeroContentDefaults,
  "services-hero": parseServicesHeroContentDefaults,
  "development-process": parseDevelopmentProcessContentDefaults,
  "company-statistics": parseCompanyStatisticsContentDefaults,
  "company-overview": parseCompanyOverviewContentDefaults,
  "core-values": parseCoreValuesContentDefaults,
  "mission-vision": parseMissionVisionContentDefaults,
  "team-members": parseTeamMembersContentDefaults,
  "blog-list": parseBlogListContentDefaults,
  portfolio: parsePortfolioContentDefaults,
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
  "contact-cta": contactCtaSettingsSchema,
  "contact-information": contactInformationSettingsSchema,
  "about-hero": z.object({}),
  "services-hero": z.object({}),
  "development-process": z.object({}),
  "company-statistics": z.object({}),
  "company-overview": z.object({}),
  "core-values": z.object({}),
  "mission-vision": z.object({}),
  "team-members": z.object({}),
  "blog-list": blogListSettingsSchema,
  portfolio: portfolioSettingsSchema,
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
  "contact-cta": ContactCtaSettingsForm,
  "contact-information": ContactInformationSettingsForm,
  "about-hero": () => null,
  "services-hero": () => null,
  "development-process": () => null,
  "company-statistics": () => null,
  "company-overview": () => null,
  "core-values": () => null,
  "mission-vision": () => null,
  "team-members": () => null,
  "blog-list": BlogListSettingsForm,
  portfolio: PortfolioSettingsForm,
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
  "contact-cta": parseContactCtaSettingsDefaults,
  "contact-information": parseContactInformationSettingsDefaults,
  "about-hero": () => ({}),
  "services-hero": () => ({}),
  "development-process": () => ({}),
  "company-statistics": () => ({}),
  "company-overview": () => ({}),
  "core-values": () => ({}),
  "mission-vision": () => ({}),
  "team-members": () => ({}),
  "blog-list": parseBlogListSettingsDefaults,
  portfolio: parsePortfolioSettingsDefaults,
};
