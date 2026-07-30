CREATE TABLE IF NOT EXISTS media (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    -- File Information
    original_name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    extension VARCHAR(20) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size BIGINT UNSIGNED NOT NULL,
    checksum CHAR(64) DEFAULT NULL,

    -- Storage
    disk VARCHAR(50) NOT NULL DEFAULT 's3',
    storage_path VARCHAR(1024) NOT NULL,
    folder VARCHAR(255) DEFAULT NULL,

    -- Image Metadata
    width INT UNSIGNED DEFAULT NULL,
    height INT UNSIGNED DEFAULT NULL,
    alt_text VARCHAR(255) DEFAULT NULL,
    caption TEXT DEFAULT NULL,
    metadata JSON DEFAULT NULL,

    -- File Classification
    type VARCHAR(50) NOT NULL,

    -- Provider Metadata
    provider_file_id VARCHAR(255) DEFAULT NULL,

    -- Audit
    uploaded_by BIGINT UNSIGNED DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    PRIMARY KEY (id),

    UNIQUE KEY uk_storage_path (storage_path),

    INDEX idx_type (type),
    INDEX idx_mime_type (mime_type),
    INDEX idx_disk (disk),
    INDEX idx_file_name (file_name),
    INDEX idx_original_name (original_name),
    INDEX idx_uploaded_by (uploaded_by),
    INDEX idx_created_at (created_at),
    INDEX idx_deleted_at (deleted_at),
    INDEX idx_type_deleted (type, deleted_at),
    INDEX idx_uploaded_by_deleted (uploaded_by, deleted_at),

    CONSTRAINT fk_media_uploaded_by
        FOREIGN KEY (uploaded_by)
        REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_unicode_ci;