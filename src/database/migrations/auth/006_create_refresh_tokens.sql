CREATE TABLE IF NOT EXISTS refresh_tokens (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT UNSIGNED NOT NULL,
    token_hash  VARCHAR(255)    NOT NULL UNIQUE,
    device_info VARCHAR(255)    DEFAULT NULL,
    ip_address  VARCHAR(45)     DEFAULT NULL,
    is_revoked  TINYINT(1)      NOT NULL DEFAULT 0,
    expires_at  TIMESTAMP       NOT NULL,
    revoked_at  TIMESTAMP       NULL DEFAULT NULL,
    created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_user_id       (user_id),
    INDEX idx_token_hash    (token_hash),
    INDEX idx_expires_at    (expires_at),

    CONSTRAINT fk_rt_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
