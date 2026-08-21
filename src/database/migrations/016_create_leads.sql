CREATE TABLE IF NOT EXISTS leads (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    -- Core Information
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30) DEFAULT NULL,
    company VARCHAR(255) DEFAULT NULL,
    message TEXT NOT NULL,
    
    status ENUM(
        'new',
        'in_progress',
        'contacted',
        'closed',
        'spam'
    ) NOT NULL DEFAULT 'new',

    -- Connection Metadata
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,

    -- Business Workflow Tracking (Optional Admin fields)
    assigned_to BIGINT UNSIGNED DEFAULT NULL,
    updated_by_admin_id BIGINT UNSIGNED DEFAULT NULL,
    resolved_by BIGINT UNSIGNED DEFAULT NULL,

    -- Audit Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    -- Indexes
    INDEX idx_leads_email (email),
    INDEX idx_leads_status (status),
    INDEX idx_leads_created_at (created_at),
    INDEX idx_leads_deleted_at (deleted_at),
    INDEX idx_leads_status_created (status, created_at),

    -- Foreign Keys for workflow tracking (if admins exist in `users` table)
    CONSTRAINT fk_leads_assigned_to
        FOREIGN KEY (assigned_to)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_leads_updated_by_admin
        FOREIGN KEY (updated_by_admin_id)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_leads_resolved_by
        FOREIGN KEY (resolved_by)
        REFERENCES users(id)
        ON DELETE SET NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
