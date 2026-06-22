CREATE TABLE IF NOT EXISTS page_sections (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    page_id BIGINT UNSIGNED NOT NULL,

    section_name VARCHAR(100) NOT NULL,

    title VARCHAR(255) DEFAULT NULL,

    content JSON NOT NULL,

    sort_order INT UNSIGNED NOT NULL DEFAULT 0,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_by BIGINT UNSIGNED DEFAULT NULL,

    updated_by BIGINT UNSIGNED DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL DEFAULT NULL,

    INDEX idx_page_id (page_id),

    INDEX idx_page_sort (page_id, sort_order),

    INDEX idx_page_active_sort (
        page_id,
        is_active,
        sort_order
    ),

    INDEX idx_page_deleted_sort (
        page_id,
        deleted_at,
        sort_order
    ),

    CONSTRAINT chk_section_name
        CHECK (CHAR_LENGTH(TRIM(section_name)) > 0),

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
        ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;