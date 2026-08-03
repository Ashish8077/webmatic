import db from "../connection";
import { toJson } from "@/shared/utils/database/json";
import { defaultFooterSettings } from "../data/footer-settings";

export async function seedSiteSettings() {
  console.log("Seeding site settings...");

  const adminId = 1;

  // Upsert Footer Settings
  await db.execute(
    `
    INSERT INTO site_settings (
      setting_key, 
      setting_value, 
      is_public, 
      created_by
    )
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      setting_value = VALUES(setting_value),
      is_public = VALUES(is_public),
      updated_by = VALUES(created_by)
    `,
    ["layout.footer", toJson(defaultFooterSettings), true, adminId]
  );

  console.log("Site settings seeded");
}
