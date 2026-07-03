ALTER TABLE page_sections 
  CHANGE COLUMN section_name section_type VARCHAR(100) NOT NULL,
  DROP CONSTRAINT chk_section_name,
  ADD CONSTRAINT chk_section_type CHECK (CHAR_LENGTH(TRIM(section_type)) > 0),
  ADD UNIQUE INDEX idx_page_section_type (page_id, section_type);
