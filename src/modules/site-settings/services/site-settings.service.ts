import { revalidatePath } from "next/cache";
import { siteSettingsRepository } from "../repositories/site-settings.repository";
import { FooterSettings } from "../types/footer.types";
import { footerSettingsSchema } from "../schemas/footer.schema";
import { defaultFooterSettings } from "@/database/data/footer-settings";
import { 
  contactSettingsSchema, 
  type ContactSettings, 
  defaultContactSettings 
} from "../schemas/contact.schema";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { headerSettingsSchema } from "../schemas/header.schema";
import { HeaderSettings } from "../types/header.types";
import { defaultHeaderSettings } from "@/database/data/header-settings";
import { findPageById } from "@/modules/pages/repositories/page.repository";
import { findServiceById } from "@/modules/services/repositories/service.repository";

export const siteSettingsService = {
  // --- Header Settings ---
  async getHeaderSettings(user: AuthUser): Promise<HeaderSettings> {
    requirePermission(user, PERMISSIONS.SETTINGS_VIEW);

    const data = await siteSettingsRepository.getByKey("layout.header");
    if (!data) return defaultHeaderSettings as unknown as HeaderSettings;
    return data as unknown as HeaderSettings;
  },

  async getPublicHeaderSettings(): Promise<HeaderSettings> {
    const data = await siteSettingsRepository.getByKey("layout.header");
    const settings = data ? (data as unknown as HeaderSettings) : (defaultHeaderSettings as unknown as HeaderSettings);
    
    // Resolve CTA URL
    let resolvedCtaUrl = settings.cta?.url || "";
    if (settings.cta?.destinationType === "page" && settings.cta.referenceId) {
      const page = await findPageById(settings.cta.referenceId);
      if (page && page.status === "published") {
        resolvedCtaUrl = `/${page.slug === "home" ? "" : page.slug}`;
      }
    } else if (settings.cta?.destinationType === "service" && settings.cta.referenceId) {
      const service = await findServiceById(settings.cta.referenceId);
      if (service && service.status === "published") {
        resolvedCtaUrl = `/services/${service.slug}`;
      }
    }

    // Sanitize: return only what public needs
    return {
      logo: settings.logo,
      contactInfo: settings.contactInfo,
      socialLinks: settings.socialLinks,
      cta: {
        ...settings.cta,
        url: resolvedCtaUrl,
      },
      visibility: settings.visibility,
    };
  },

  async updateHeaderSettings(data: unknown, user: AuthUser): Promise<void> {
    requirePermission(user, PERMISSIONS.SETTINGS_UPDATE);

    const validatedData = headerSettingsSchema.parse(data);

    await siteSettingsRepository.upsert(
      "layout.header",
      validatedData,
      true, // is_public
      user.userId,
    );

    revalidatePath("/", "layout");
  },

  // --- Footer Settings ---

  async getFooterSettings(user: AuthUser): Promise<FooterSettings> {
    requirePermission(user, PERMISSIONS.SETTINGS_VIEW);

    const data = await siteSettingsRepository.getByKey("layout.footer");

    if (!data) {
      return defaultFooterSettings as unknown as FooterSettings;
    }

    return data as unknown as FooterSettings;
  },

  async getPublicFooterSettings(): Promise<FooterSettings> {
    const data = await siteSettingsRepository.getByKey("layout.footer");

    if (!data) {
      return defaultFooterSettings as unknown as FooterSettings;
    }

    return data as unknown as FooterSettings;
  },

  async updateFooterSettings(data: unknown, user: AuthUser): Promise<void> {
    requirePermission(user, PERMISSIONS.SETTINGS_UPDATE);

    const validatedData = footerSettingsSchema.parse(data);

    await siteSettingsRepository.upsert(
      "layout.footer",
      validatedData,
      true, // is_public = true for layout.footer
      user.userId,
    );

    // Invalidate caches
    revalidatePath("/", "layout");
  },

  // --- Contact Settings ---

  async getContactSettings(user?: AuthUser): Promise<ContactSettings> {
    if (user) {
      requirePermission(user, PERMISSIONS.SETTINGS_VIEW);
    }

    const data = await siteSettingsRepository.getByKey("contact.configuration");

    if (!data) {
      return defaultContactSettings;
    }

    return data as unknown as ContactSettings;
  },

  async getPublicContactSettings(): Promise<ContactSettings> {
    const data = await siteSettingsRepository.getByKey("contact.configuration");

    if (!data) {
      return defaultContactSettings;
    }

    return data as unknown as ContactSettings;
  },

  async updateContactSettings(data: unknown, user: AuthUser): Promise<void> {
    requirePermission(user, PERMISSIONS.SETTINGS_UPDATE);

    const validatedData = contactSettingsSchema.parse(data);

    await siteSettingsRepository.upsert(
      "contact.configuration",
      validatedData,
      true, // is_public = true so frontend can fetch it
      user.userId,
    );

    // Invalidate caches
    revalidatePath("/contact");
    revalidatePath("/contact-us");
    revalidatePath("/");
    revalidatePath("/services");
  },
};
