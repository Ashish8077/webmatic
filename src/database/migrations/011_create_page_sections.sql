CREATE TABLE IF NOT EXISTS page_sections (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    page_id BIGINT UNSIGNED NOT NULL,

    section_type VARCHAR(100) NOT NULL,

    content JSON NOT NULL COMMENT 'Section-specific content',

    settings JSON DEFAULT NULL COMMENT 'Layout/UI configuration',

    sort_order INT UNSIGNED NOT NULL DEFAULT 0,

    status ENUM(
        'draft',
        'published'
    ) NOT NULL DEFAULT 'draft',

    published_at TIMESTAMP NULL DEFAULT NULL,

    created_by BIGINT UNSIGNED DEFAULT NULL,

    updated_by BIGINT UNSIGNED DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL DEFAULT NULL,

    INDEX idx_page_id (page_id),

    INDEX idx_section_type (section_type),


    INDEX idx_page_deleted_sort (
        page_id,
        deleted_at,
        display_order
    ),

    INDEX idx_page_visible (
        page_id,
        status,
        deleted_at,
        display_order
        ),

    INDEX idx_published_at (published_at),

    CONSTRAINT chk_section_type
        CHECK (
            CHAR_LENGTH(TRIM(section_type)) > 0
        ),

    CONSTRAINT fk_page_sections_page
        FOREIGN KEY (page_id)
        REFERENCES pages(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_page_sections_created_by
        FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT fk_page_sections_updated_by
        FOREIGN KEY (updated_by)
        REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT chk_display_order
        CHECK (display_order >= 0),

    CONSTRAINT chk_content_json
        CHECK (JSON_VALID(content)),

    CONSTRAINT chk_settings_json
        CHECK (
            settings IS NULL
            OR JSON_VALID(settings)
        )
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;