CREATE TABLE IF NOT EXISTS pages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,


    -- Basic Information
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    status ENUM(
        'draft',
        'published'
    ) NOT NULL DEFAULT 'draft',

    -- SEO
    seo_title VARCHAR(255) DEFAULT NULL,
    meta_description TEXT DEFAULT NULL,
    meta_keywords TEXT DEFAULT NULL,
    canonical_url VARCHAR(500) DEFAULT NULL,

    -- Open Graph
    og_title VARCHAR(255) DEFAULT NULL,
    og_description TEXT DEFAULT NULL,
    og_image_id BIGINT UNSIGNED DEFAULT NULL,

    -- Twitter Card
    twitter_title VARCHAR(255) DEFAULT NULL,
    twitter_description TEXT DEFAULT NULL,
    twitter_image_id BIGINT UNSIGNED DEFAULT NULL,

    -- Robots tags
    robots_index BOOLEAN NOT NULL DEFAULT TRUE,
    robots_follow BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Structured Data
    schema_markup JSON DEFAULT NULL,

    -- Publishing
    published_at TIMESTAMP NULL DEFAULT NULL,


    -- Audit
    created_by BIGINT UNSIGNED DEFAULT NULL,
    updated_by BIGINT UNSIGNED DEFAULT NULL,
    deleted_by BIGINT UNSIGNED DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL DEFAULT NULL,

    -- Indexes
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_published_at (published_at),
    INDEX idx_status_deleted (status, deleted_at),

    CONSTRAINT chk_page_title
        CHECK (CHAR_LENGTH(TRIM(title)) > 0),

    CONSTRAINT fk_pages_created_by
        FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_pages_updated_by
        FOREIGN KEY (updated_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_pages_deleted_by
        FOREIGN KEY (deleted_by)
        REFERENCES users(id)
        ON DELETE SET NULL


    -- Add these after creating the media table
    -- ,
    -- CONSTRAINT fk_pages_og_image
    --     FOREIGN KEY (og_image_id)
    --     REFERENCES media(id)
    --     ON DELETE SET NULL,
    --
    -- CONSTRAINT fk_pages_twitter_image
    --     FOREIGN KEY (twitter_image_id)
    --     REFERENCES media(id)
    --     ON DELETE SET NULL     
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;