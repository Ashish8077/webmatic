CREATE TABLE IF NOT EXISTS work_projects (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    -- Basic Information
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    short_description TEXT NULL,
    description LONGTEXT NULL,
    project_url VARCHAR(500) NULL,

    -- Media
    featured_image_id BIGINT UNSIGNED NULL,

    -- SEO
    seo_title VARCHAR(255) NULL,
    meta_description VARCHAR(500) NULL,
    meta_keywords VARCHAR(500) NULL,
    canonical_url VARCHAR(2048) NULL,

    open_graph_title VARCHAR(255) NULL,
    open_graph_description VARCHAR(500) NULL,
    open_graph_image_id BIGINT UNSIGNED NULL,

    twitter_title VARCHAR(255) NULL,
    twitter_description VARCHAR(500) NULL,
    twitter_image_id BIGINT UNSIGNED NULL,

    schema_markup JSON NULL,

    -- Settings
    status ENUM('draft','published') NOT NULL DEFAULT 'draft',
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT UNSIGNED NOT NULL DEFAULT 0,

    -- Audit
    published_at TIMESTAMP NULL DEFAULT NULL,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    deleted_by BIGINT UNSIGNED NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    CONSTRAINT uk_work_projects_slug UNIQUE (slug),

    CONSTRAINT fk_work_projects_created_by
        FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_work_projects_updated_by
        FOREIGN KEY (updated_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_work_projects_deleted_by
        FOREIGN KEY (deleted_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    INDEX idx_work_projects_deleted_status_sort (
        deleted_at,
        status,
        sort_order
    ),

    INDEX idx_work_projects_deleted_status_featured_sort (
        deleted_at,
        status,
        is_featured,
        sort_order
    ),

    INDEX idx_work_projects_category (category),

    INDEX idx_work_projects_deleted_created (
        deleted_at,
        created_at
    ),

    CONSTRAINT chk_work_projects_sort_order
        CHECK (sort_order >= 0)

) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
