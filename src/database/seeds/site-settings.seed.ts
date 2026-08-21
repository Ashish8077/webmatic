import db from "../connection";
import { toJson } from "@/shared/utils/database/json";
import { defaultFooterSettings } from "../data/footer-settings";
import { defaultHeaderSettings } from "../data/header-settings";

export async function seedSiteSettings() {
  console.log("Seeding site settings...");

  const adminId = 1;

  // Insert Footer Settings (Idempotent - will not overwrite if exists)
  await db.execute(
    `
    INSERT IGNORE INTO site_settings (
      setting_key, 
      setting_value, 
      is_public, 
      created_by
    )
    VALUES (?, ?, ?, ?)
    `,
    ["layout.footer", toJson(defaultFooterSettings), true, adminId]
  );

  // Insert Header Settings (Idempotent - will not overwrite if exists)
  await db.execute(
    `
    INSERT IGNORE INTO site_settings (
      setting_key, 
      setting_value, 
      is_public, 
      created_by
    )
    VALUES (?, ?, ?, ?)
    `,
    ["layout.header", toJson(defaultHeaderSettings), true, adminId]
  );

  console.log("Site settings seeded");
}
