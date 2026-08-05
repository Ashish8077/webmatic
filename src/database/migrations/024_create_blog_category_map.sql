CREATE TABLE IF NOT EXISTS blog_category_map (
    blog_id BIGINT UNSIGNED NOT NULL,
    category_id BIGINT UNSIGNED NOT NULL,
    
    -- Composite primary key 
    PRIMARY KEY (blog_id, category_id),
    
    -- Secondary index for reverse lookup
    INDEX idx_blog_cat_reverse (category_id, blog_id),

    CONSTRAINT fk_bcm_blog FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
    CONSTRAINT fk_bcm_cat FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
