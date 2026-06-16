CREATE TABLE IF NOT EXISTS users (
    id                      BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name              VARCHAR(100)    NOT NULL,
    last_name               VARCHAR(100)    NOT NULL,
    email                   VARCHAR(255)    NOT NULL UNIQUE,
    phone                   VARCHAR(20)     DEFAULT NULL,
    password_hash           VARCHAR(255)    NOT NULL,
    role                    ENUM('SUPER_ADMIN','EDITOR','MARKETING_MANAGER') NOT NULL DEFAULT 'EDITOR',
    profile_image           VARCHAR(500)    DEFAULT NULL,
    status                  ENUM('active','inactive','suspended') NOT NULL DEFAULT 'active',
    email_verified          BOOLEAN         NOT NULL DEFAULT FALSE,
    email_verified_at       TIMESTAMP       NULL DEFAULT NULL,
    failed_login_attempts   TINYINT UNSIGNED NOT NULL DEFAULT 0,
    locked_until            TIMESTAMP       NULL DEFAULT NULL,
    password_changed_at     TIMESTAMP       NULL DEFAULT NULL,
    created_at              TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at              TIMESTAMP       NULL DEFAULT NULL,

    INDEX idx_role          (role),
    INDEX idx_status        (status),
    INDEX idx_deleted_at    (deleted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;