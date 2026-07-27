-- 1. Add new columns for standardized visual architecture
ALTER TABLE services 
  ADD COLUMN visual_type ENUM('none', 'icon', 'image') NOT NULL DEFAULT 'none' AFTER short_description,
  ADD COLUMN image_id BIGINT UNSIGNED NULL AFTER icon_name;

-- 2. Migrate existing data to preserve backward compatibility
UPDATE services 
SET visual_type = 'icon' 
WHERE icon_type = 'library' AND icon_name IS NOT NULL;

UPDATE services 
SET visual_type = 'image', image_id = icon_image_id 
WHERE icon_type = 'image' AND icon_image_id IS NOT NULL;

-- 3. Drop old columns
ALTER TABLE services
  DROP COLUMN icon_type,
  DROP COLUMN icon_image_id;

-- 4. Add foreign key for the new image_id (if not already managed elsewhere, matching Media Library)
-- Note: Assuming foreign keys for images might be managed at the application level in this CMS or previously commented out,
-- we'll leave the constraint commented out to match the style of 012_create_services.sql
-- CONSTRAINT fk_services_visual_image
--     FOREIGN KEY (image_id)
--     REFERENCES media(id)
--     ON DELETE SET NULL;
