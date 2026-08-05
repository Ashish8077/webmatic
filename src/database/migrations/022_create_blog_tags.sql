CREATE TABLE IF NOT EXISTS blog_tags (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,

    -- Audit
    created_by BIGINT UNSIGNED DEFAULT NULL,
    updated_by BIGINT UNSIGNED DEFAULT NULL,
    deleted_by BIGINT UNSIGNED DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    -- Indexes
    INDEX idx_blog_tag_created_by (created_by),
    INDEX idx_blog_tag_updated_by (updated_by),
    INDEX idx_blog_tag_deleted_by (deleted_by),
    INDEX idx_blog_tag_deleted_at (deleted_at),
    INDEX idx_blog_tag_created_at (created_at),
    INDEX idx_blog_tag_updated_at (updated_at),

    CONSTRAINT uk_blog_tag_slug UNIQUE (slug),
    CONSTRAINT chk_blog_tag_name CHECK (CHAR_LENGTH(TRIM(name)) > 0),
    CONSTRAINT fk_blog_tag_created FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_blog_tag_updated FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_blog_tag_deleted FOREIGN KEY (deleted_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
