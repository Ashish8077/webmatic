import { revalidatePath } from "next/cache";
import { siteSettingsRepository } from "../repositories/site-settings.repository";
import { FooterSettings } from "../types/footer.types";
import { footerSettingsSchema } from "../schemas/footer.schema";
import { defaultFooterSettings } from "@/database/data/footer-settings";

export const siteSettingsService = {
  // --- Footer Settings ---

  async getFooterSettings(): Promise<FooterSettings> {
    const data = await siteSettingsRepository.getByKey("layout.footer");
    
    if (!data) {
      return defaultFooterSettings as unknown as FooterSettings;
    }

    return data as unknown as FooterSettings;
  },

  async updateFooterSettings(data: unknown, adminId: number): Promise<void> {
    const validatedData = footerSettingsSchema.parse(data);
    
    await siteSettingsRepository.upsert(
      "layout.footer", 
      validatedData, 
      true, // is_public = true for layout.footer
      adminId
    );

    // Invalidate caches
    revalidatePath("/", "layout");
  },

  // Future expansion: getHeaderSettings(), getSeoSettings(), etc.
};
