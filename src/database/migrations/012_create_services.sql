CREATE TABLE IF NOT EXISTS services (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    -- Basic Information
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    short_description TEXT NULL,
    description LONGTEXT NULL,

    -- Visual Asset
    visual_type ENUM('none', 'icon', 'image') NOT NULL DEFAULT 'none',
    icon_name VARCHAR(100) NULL,
    image_id BIGINT UNSIGNED NULL,

    -- Images
    featured_image_id BIGINT UNSIGNED NULL,
    banner_image_id BIGINT UNSIGNED NULL,

    -- Content
    key_features JSON NULL,
    benefits JSON NULL,
    faq JSON NULL,

    -- CTA
    cta_title VARCHAR(255) NULL,
    cta_description TEXT NULL,
    cta_button_text VARCHAR(100) NULL,
    cta_button_url VARCHAR(500) NULL,

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


    CONSTRAINT uk_services_name UNIQUE (name),
    CONSTRAINT uk_services_slug UNIQUE (slug),

    -- CONSTRAINT fk_services_featured_image
    --     FOREIGN KEY (featured_image_id)
    --     REFERENCES media(id)
    --     ON DELETE SET NULL,

    -- CONSTRAINT fk_services_banner_image
    --     FOREIGN KEY (banner_image_id)
    --     REFERENCES media(id)
    --     ON DELETE SET NULL,

    -- CONSTRAINT fk_services_og_image
    --     FOREIGN KEY (open_graph_image_id)
    --     REFERENCES media(id)
    --     ON DELETE SET NULL,

    -- CONSTRAINT fk_services_twitter_image
    --     FOREIGN KEY (twitter_image_id)
    --     REFERENCES media(id)
    --     ON DELETE SET NULL,

    CONSTRAINT fk_services_created_by
        FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_services_updated_by
        FOREIGN KEY (updated_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_services_deleted_by
        FOREIGN KEY (deleted_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    INDEX idx_services_deleted_status_sort (
        deleted_at,
        status,
        sort_order
    ),

    INDEX idx_services_deleted_status_featured_sort (
        deleted_at,
        status,
        is_featured,
        sort_order
    ),

    INDEX idx_services_deleted_created (
        deleted_at,
        created_at
    ),

    INDEX idx_services_deleted_updated (
        deleted_at,
        updated_at
    ),

    CONSTRAINT chk_services_sort_order
        CHECK (sort_order >= 0)


) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
