CREATE TABLE IF NOT EXISTS audit_logs (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED DEFAULT NULL,
    action          VARCHAR(100)    NOT NULL,
    entity_type     VARCHAR(100)    DEFAULT NULL,
    entity_id       BIGINT UNSIGNED DEFAULT NULL,
    old_values      JSON            DEFAULT NULL,
    new_values      JSON            DEFAULT NULL,
    ip_address      VARCHAR(45)     DEFAULT NULL,
    user_agent      VARCHAR(500)    DEFAULT NULL,
    status          ENUM('success','failure','warning') NOT NULL DEFAULT 'success',
    description     TEXT            DEFAULT NULL,
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_user_id       (user_id),
    INDEX idx_action        (action),
    INDEX idx_entity        (entity_type, entity_id),
    INDEX idx_created_at    (created_at),

    CONSTRAINT fk_al_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
