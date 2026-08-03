import db from "@/database/connection";
import { RowDataPacket } from "mysql2/promise";
import { toJson } from "@/shared/utils/database/json";
import { JsonObject } from "@/shared/types/json";

interface SiteSettingRow extends RowDataPacket {
  setting_value: JsonObject;
}

export const siteSettingsRepository = {
  async getByKey(key: string): Promise<JsonObject | null> {
    const [rows] = await db.execute<SiteSettingRow[]>(
      `
      SELECT setting_value 
      FROM site_settings 
      WHERE setting_key = ? AND deleted_at IS NULL
      LIMIT 1
      `,
      [key]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0].setting_value;
  },

  async upsert(key: string, value: JsonObject, isPublic: boolean, adminId: number): Promise<void> {
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
      [key, toJson(value), isPublic, adminId]
    );
  }
};
