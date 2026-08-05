CREATE TABLE IF NOT EXISTS blog_tag_map (
    blog_id BIGINT UNSIGNED NOT NULL,
    tag_id BIGINT UNSIGNED NOT NULL,
    
    -- Composite primary key
    PRIMARY KEY (blog_id, tag_id),
    
    -- Secondary index for reverse lookup
    INDEX idx_blog_tag_reverse (tag_id, blog_id),

    CONSTRAINT fk_btm_blog FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
    CONSTRAINT fk_btm_tag FOREIGN KEY (tag_id) REFERENCES blog_tags(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
