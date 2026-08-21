CREATE TABLE IF NOT EXISTS blogs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    -- Basic Info
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    excerpt TEXT DEFAULT NULL,
    content LONGTEXT NOT NULL,
    
    -- Authorship
    author_id BIGINT UNSIGNED DEFAULT NULL,

    -- Media
    featured_image_id BIGINT UNSIGNED DEFAULT NULL,

    -- Status & Publishing
    status ENUM('draft', 'published', 'scheduled') NOT NULL DEFAULT 'draft',
    published_at TIMESTAMP NULL DEFAULT NULL,
    is_featured TINYINT(1) NOT NULL DEFAULT 0,

    -- SEO (Matching pages exactly)
    seo_title VARCHAR(255) DEFAULT NULL,
    meta_description TEXT DEFAULT NULL,
    meta_keywords TEXT DEFAULT NULL,
    canonical_url VARCHAR(2048) DEFAULT NULL,

    -- Open Graph
    og_title VARCHAR(255) DEFAULT NULL,
    og_description TEXT DEFAULT NULL,
    og_image_id BIGINT UNSIGNED DEFAULT NULL,

    -- Twitter Card
    twitter_title VARCHAR(255) DEFAULT NULL,
    twitter_description TEXT DEFAULT NULL,
    twitter_image_id BIGINT UNSIGNED DEFAULT NULL,
    
    -- Robots (Matching pages)
    robots_index TINYINT(1) NOT NULL DEFAULT 1,
    robots_follow TINYINT(1) NOT NULL DEFAULT 1,

    -- Structured Data
    schema_markup JSON DEFAULT NULL,

    -- Audit
    created_by BIGINT UNSIGNED DEFAULT NULL,
    updated_by BIGINT UNSIGNED DEFAULT NULL,
    deleted_by BIGINT UNSIGNED DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    -- Individual Performance Indexes
    INDEX idx_blogs_published_at (published_at),
    INDEX idx_blogs_created_at (created_at),
    INDEX idx_blogs_updated_at (updated_at),
    INDEX idx_blogs_featured_img (featured_image_id),
    INDEX idx_blogs_author (author_id),
    INDEX idx_blogs_og_img (og_image_id),
    INDEX idx_blogs_twitter_img (twitter_image_id),
    INDEX idx_blogs_created_by (created_by),
    INDEX idx_blogs_updated_by (updated_by),
    INDEX idx_blogs_deleted_by (deleted_by),

    -- Composite Public Fetch Indexes
    INDEX idx_blogs_public_fetch (status, published_at, deleted_at),
    INDEX idx_blogs_status_deleted (status, deleted_at),
    INDEX idx_blogs_author_deleted (author_id, deleted_at),
    INDEX idx_blogs_featured_deleted (is_featured, deleted_at),

    -- Constraints
    CONSTRAINT uk_blog_slug UNIQUE (slug),
    CONSTRAINT chk_blog_title CHECK (CHAR_LENGTH(TRIM(title)) > 0),
    CONSTRAINT chk_blog_slug CHECK (CHAR_LENGTH(TRIM(slug)) > 0),
    
    CONSTRAINT fk_blogs_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_blogs_featured_img FOREIGN KEY (featured_image_id) REFERENCES media(id) ON DELETE SET NULL,
    CONSTRAINT fk_blogs_og_img FOREIGN KEY (og_image_id) REFERENCES media(id) ON DELETE SET NULL,
    CONSTRAINT fk_blogs_twitter_img FOREIGN KEY (twitter_image_id) REFERENCES media(id) ON DELETE SET NULL,

    CONSTRAINT fk_blogs_created FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_blogs_updated FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_blogs_deleted FOREIGN KEY (deleted_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
