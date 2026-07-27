CREATE TABLE IF NOT EXISTS testimonials (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    -- Content
    client_name VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NULL,
    company_name VARCHAR(255) NULL,
    profile_image_id BIGINT UNSIGNED NULL,
    title VARCHAR(255) NULL,
    description TEXT NOT NULL,
    rating TINYINT UNSIGNED NOT NULL,

    -- Settings
    status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
    sort_order INT UNSIGNED NOT NULL DEFAULT 0,

    -- Audit
    published_at TIMESTAMP NULL DEFAULT NULL,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    deleted_by BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    -- Constraints
    CONSTRAINT chk_testimonials_rating CHECK (rating >= 1 AND rating <= 5),
    CONSTRAINT chk_testimonials_sort_order CHECK (sort_order >= 0),

    CONSTRAINT fk_testimonials_created_by
        FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_testimonials_updated_by
        FOREIGN KEY (updated_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_testimonials_deleted_by
        FOREIGN KEY (deleted_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    -- Indexes
    INDEX idx_testimonials_deleted_status_sort (deleted_at, status, sort_order)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
