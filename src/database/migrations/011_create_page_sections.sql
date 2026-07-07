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

    created_by BIGINT UNSIGNED DEFAULT NULL,

    updated_by BIGINT UNSIGNED DEFAULT NULL,

    deleted_by BIGINT UNSIGNED DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL DEFAULT NULL,


    INDEX idx_page_deleted_sort (
        page_id,
        deleted_at,
        sort_order
    ),

    INDEX idx_page_visible (
        page_id,
        status,
        deleted_at,
        sort_order
        ),

    CONSTRAINT uk_page_section_type_per_page
        UNIQUE (page_id, section_type),


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

    CONSTRAINT fk_page_sections_deleted_by
        FOREIGN KEY (deleted_by)
        REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT chk_sort_order
        CHECK (sort_order >= 0)

)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;