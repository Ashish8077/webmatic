# Authentication System

> **CMS Admin Panel — Internal Documentation**
>
> Last updated: 2026-06-17

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Token Strategy](#token-strategy)
- [Cookie Security](#cookie-security)
- [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)
- [Database Setup](#database-setup)
- [Security Considerations](#security-considerations)

---

## Overview

The CMS Admin authentication system is a **stateful, cookie-based JWT authentication** implementation built on Next.js 16 App Router API routes. It uses a dual-token strategy (access + refresh tokens) with HTTP-only cookies, backed by a MySQL database for session persistence and token revocation.

**Key design decisions:**

- **HTTP-only cookies** — Tokens are never exposed to client-side JavaScript, eliminating XSS token theft.
- **Server-side refresh token storage** — Refresh tokens are SHA-256 hashed and stored in MySQL, enabling instant revocation on logout.
- **Role-based access control** — A full RBAC system with roles, permissions, and role-permission mappings.
- **Modular architecture** — Clean separation between routes, services, repositories, validators, and utilities.

---

## Tech Stack

| Layer          | Technology                    |
| -------------- | ----------------------------- |
| Framework      | Next.js 16 (App Router)       |
| Language       | TypeScript                    |
| Database       | MySQL 8+ via `mysql2/promise` |
| Password Hash  | bcryptjs (12 salt rounds)     |
| JWT            | jsonwebtoken                  |
| Validation     | Zod v4                        |
| Token Hashing  | Node.js `crypto` (SHA-256)    |
| Env Validation | Zod (via `@next/env`)         |

---

## Architecture

The system follows a **layered modular architecture**. Each auth operation flows through distinct layers:

```
Request
  │
  ▼
┌─────────────────────────────────────────┐
│  API Route  (src/app/api/auth/*)        │  ← HTTP layer: parse request, return response
│  - Validates input via Zod schemas      │
│  - Delegates to service layer           │
│  - Sets/clears cookies on response      │
│  - Catches errors via handleApiError()  │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  Service       (src/modules/auth/services)│  ← Business logic
│  - Orchestrates auth operations          │
│  - Calls repositories for data access    │
│  - Generates tokens, hashes, etc.        │
│  - Throws AppError for known failures    │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  Repository    (src/modules/auth/repositories)│  ← Data access
│  - Raw SQL queries via mysql2/promise    │
│  - One function per query                │
│  - Returns plain objects                 │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  MySQL Database                          │
│  - Connection pool (10 connections)      │
│  - InnoDB, utf8mb4_unicode_ci            │
└─────────────────────────────────────────┘
```

**Supporting layers:**

| Layer      | Location                       | Purpose                                              |
| ---------- | ------------------------------ | ---------------------------------------------------- |
| Validators | `src/modules/auth/validators/` | Zod schemas for request body validation              |
| Utils      | `src/modules/auth/utils/`      | JWT generation, password hashing, cookie helpers     |
| Errors     | `src/lib/errors/`              | Custom error classes (`AppError`, `ValidationError`) |
| HTTP       | `src/lib/http/`                | Standardized success/error response helpers          |
| Constants  | `src/modules/auth/constants/`  | Role and permission string constants                 |
| Types      | `src/modules/auth/types/`      | TypeScript interfaces for users                      |
| Config     | `src/config/env.ts`            | Zod-validated environment variables                  |

---

## Database Schema

The auth system spans **8 database tables**, managed via a custom SQL migration runner.

### Entity Relationship

```
roles ──────────┐
                │
permissions ────┤
                │
role_permissions ◄──── (role_id, permission_id) composite PK
                │
users ──────────┼──── role_id FK → roles.id
                │
refresh_tokens ─┼──── user_id FK → users.id (CASCADE)
                │
password_reset_tokens ── user_id FK → users.id (CASCADE)
                │
email_verification_tokens ── user_id FK → users.id (CASCADE)
                │
audit_logs ─────┘──── user_id FK → users.id (SET NULL)
```

### Table Definitions

#### `roles`

Stores system roles. Each user is assigned exactly one role.

| Column       | Type            | Notes                        |
| ------------ | --------------- | ---------------------------- |
| `id`         | BIGINT UNSIGNED | PK, auto-increment           |
| `name`       | VARCHAR(50)     | Display name                 |
| `slug`       | VARCHAR(50)     | Unique identifier            |
| `created_at` | TIMESTAMP       | Default: `CURRENT_TIMESTAMP` |
| `updated_at` | TIMESTAMP       | Auto-updated                 |

**Seeded roles:** `super-admin`, `editor`, `marketing-manager`, `content-manager`, `sales-manager`

#### `permissions`

Granular permission definitions. Format: `module.action` (e.g., `page.create`).

| Column       | Type            | Notes                |
| ------------ | --------------- | -------------------- |
| `id`         | BIGINT UNSIGNED | PK                   |
| `name`       | VARCHAR(150)    | Display name         |
| `slug`       | VARCHAR(150)    | Unique, dot-notation |
| `module`     | VARCHAR(100)    | Grouping module      |
| `created_at` | TIMESTAMP       |                      |
| `updated_at` | TIMESTAMP       |                      |

#### `role_permissions`

Many-to-many junction table between roles and permissions.

| Column          | Type            | Notes                          |
| --------------- | --------------- | ------------------------------ |
| `role_id`       | BIGINT UNSIGNED | Composite PK, FK → roles       |
| `permission_id` | BIGINT UNSIGNED | Composite PK, FK → permissions |

**Note:** Super Admin is granted all permissions via the `"*"` wildcard in seed data.

#### `users`

Core user table with comprehensive profile and security fields.

| Column                  | Type                                  | Notes                        |
| ----------------------- | ------------------------------------- | ---------------------------- |
| `id`                    | BIGINT UNSIGNED                       | PK                           |
| `first_name`            | VARCHAR(100)                          | Required                     |
| `last_name`             | VARCHAR(100)                          | Required                     |
| `email`                 | VARCHAR(255)                          | Unique                       |
| `phone`                 | VARCHAR(20)                           | Nullable                     |
| `password_hash`         | VARCHAR(255)                          | bcrypt hash                  |
| `role_id`               | BIGINT UNSIGNED                       | FK → roles (RESTRICT delete) |
| `profile_image`         | VARCHAR(500)                          | Nullable                     |
| `status`                | ENUM('active','inactive','suspended') | Default: `active`            |
| `email_verified`        | BOOLEAN                               | Default: `FALSE`             |
| `email_verified_at`     | TIMESTAMP                             | Nullable                     |
| `failed_login_attempts` | TINYINT UNSIGNED                      | Default: `0`                 |
| `locked_until`          | TIMESTAMP                             | Nullable                     |
| `password_changed_at`   | TIMESTAMP                             | Nullable                     |
| `created_at`            | TIMESTAMP                             |                              |
| `updated_at`            | TIMESTAMP                             | Auto-updated                 |
| `deleted_at`            | TIMESTAMP                             | Soft delete                  |

**Indexes:** `role_id`, `status`, `deleted_at`

#### `refresh_tokens`

Server-side storage for active refresh token hashes. Enables revocation.

| Column        | Type            | Notes                  |
| ------------- | --------------- | ---------------------- |
| `id`          | BIGINT UNSIGNED | PK                     |
| `user_id`     | BIGINT UNSIGNED | FK → users (CASCADE)   |
| `token_hash`  | VARCHAR(255)    | Unique, SHA-256 of JWT |
| `device_info` | VARCHAR(255)    | Nullable (future use)  |
| `ip_address`  | VARCHAR(45)     | Nullable (future use)  |
| `is_revoked`  | TINYINT(1)      | Default: `0`           |
| `expires_at`  | TIMESTAMP       | Token expiry           |
| `revoked_at`  | TIMESTAMP       | When revoked           |
| `created_at`  | TIMESTAMP       |                        |

**Indexes:** `user_id`, `token_hash`, `expires_at`

#### `password_reset_tokens`

Stores hashed password reset tokens with single-use tracking.

| Column       | Type            | Notes                |
| ------------ | --------------- | -------------------- |
| `id`         | BIGINT UNSIGNED | PK                   |
| `user_id`    | BIGINT UNSIGNED | FK → users (CASCADE) |
| `token_hash` | VARCHAR(255)    | Unique               |
| `is_used`    | TINYINT(1)      | Default: `0`         |
| `used_at`    | TIMESTAMP       | Nullable             |
| `expires_at` | TIMESTAMP       |                      |
| `ip_address` | VARCHAR(45)     | Nullable             |
| `created_at` | TIMESTAMP       |                      |

#### `email_verification_tokens`

Stores hashed email verification tokens.

| Column       | Type            | Notes                |
| ------------ | --------------- | -------------------- |
| `id`         | BIGINT UNSIGNED | PK                   |
| `user_id`    | BIGINT UNSIGNED | FK → users (CASCADE) |
| `token_hash` | VARCHAR(255)    | Unique               |
| `is_used`    | TINYINT(1)      | Default: `0`         |
| `used_at`    | TIMESTAMP       | Nullable             |
| `expires_at` | TIMESTAMP       |                      |
| `created_at` | TIMESTAMP       |                      |

#### `audit_logs`

Tracks security-relevant actions with before/after state.

| Column        | Type                                | Notes                   |
| ------------- | ----------------------------------- | ----------------------- |
| `id`          | BIGINT UNSIGNED                     | PK                      |
| `user_id`     | BIGINT UNSIGNED                     | FK → users (SET NULL)   |
| `action`      | VARCHAR(100)                        | e.g., `login`, `logout` |
| `entity_type` | VARCHAR(100)                        | e.g., `user`, `page`    |
| `entity_id`   | BIGINT UNSIGNED                     | Affected entity         |
| `old_values`  | JSON                                | Previous state          |
| `new_values`  | JSON                                | New state               |
| `ip_address`  | VARCHAR(45)                         |                         |
| `user_agent`  | VARCHAR(500)                        |                         |
| `status`      | ENUM('success','failure','warning') | Default: `success`      |
| `description` | TEXT                                | Nullable                |
| `created_at`  | TIMESTAMP                           |                         |

**Indexes:** `user_id`, `action`, `(entity_type, entity_id)`, `created_at`

---

## Environment Variables

All environment variables are validated at startup via Zod. The app will fail fast if any are missing or invalid.

**Configured in:** `src/config/env.ts`

| Variable                 | Type   | Description                                   |
| ------------------------ | ------ | --------------------------------------------- |
| `DB_HOST`                | string | MySQL host                                    |
| `DB_PORT`                | number | MySQL port                                    |
| `DB_USER`                | string | MySQL user                                    |
| `DB_PASSWORD`            | string | MySQL password                                |
| `DB_NAME`                | string | MySQL database name                           |
| `SUPER_ADMIN_FIRST_NAME` | string | Bootstrap admin first name                    |
| `SUPER_ADMIN_LAST_NAME`  | string | Bootstrap admin last name                     |
| `SUPER_ADMIN_EMAIL`      | email  | Bootstrap admin email                         |
| `SUPER_ADMIN_PASSWORD`   | string | Bootstrap admin password (min 8 chars)        |
| `JWT_ACCESS_SECRET`      | string | Secret for signing access tokens              |
| `JWT_ACCESS_EXPIRES_IN`  | string | Access token TTL (e.g., `15m`, `1h`)          |
| `JWT_REFRESH_SECRET`     | string | Secret for signing refresh tokens             |
| `JWT_REFRESH_EXPIRES_IN` | string | Refresh token TTL (e.g., `7d`, `30d`)         |
| `REFRESH_TOKEN_DAYS`     | number | Refresh token expiry in days (for DB storage) |
| `NODE_ENV`               | enum   | `development` or `production`                 |

**Duration format:** Supported suffixes are `m` (minutes), `h` (hours), `d` (days).

---

## API Endpoints

### `POST /api/auth/login`

Authenticates a user with email and password. Returns user data and sets auth cookies.

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

**Validation Rules (Zod):**

| Field      | Rules                             |
| ---------- | --------------------------------- |
| `email`    | Valid email, trimmed, lowercased  |
| `password` | Required string, 1–255 characters |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "admin@example.com",
      "role": "super-admin"
    }
  }
}
```

**Cookies Set:**

| Cookie         | Value      | Flags                                            |
| -------------- | ---------- | ------------------------------------------------ |
| `accessToken`  | JWT string | httpOnly, secure (prod), sameSite=strict, path=/ |
| `refreshToken` | JWT string | httpOnly, secure (prod), sameSite=strict, path=/ |

**Error Responses:**

| Status | Condition                  | Message                     |
| ------ | -------------------------- | --------------------------- |
| 400    | Validation failed          | Field-level Zod errors      |
| 401    | Wrong email or password    | `Invalid email or password` |
| 500    | Inactive/suspended account | `Account is not active`     |
| 500    | Unexpected server error    | `Internal server error`     |

---

### `POST /api/auth/logout`

Revokes the refresh token and clears auth cookies. Does not require a request body.

**How it works:**

1. Reads `refreshToken` cookie from the request.
2. If present, hashes it with SHA-256 and marks the matching DB row as revoked.
3. Clears both `accessToken` and `refreshToken` cookies from the response.
4. Returns success even if no refresh token was present (graceful logout).

**Success Response (200):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Authentication Flow

### Login Flow

```
Client                          Server
  │                               │
  │  POST /api/auth/login         │
  │  { email, password }          │
  │──────────────────────────────►│
  │                               │
  │                    ┌──────────┤
  │                    │ 1. Validate input (Zod)
  │                    │ 2. Find user by email (exclude soft-deleted)
  │                    │ 3. Check user.status === "active"
  │                    │ 4. Compare password with bcrypt hash
  │                    │ 5. Generate access JWT (short-lived)
  │                    │ 6. Generate refresh JWT (long-lived)
  │                    │ 7. SHA-256 hash the refresh token
  │                    │ 8. Store hash in refresh_tokens table
  │                    │ 9. Build success response
  │                    │ 10. Set accessToken cookie
  │                    │ 11. Set refreshToken cookie
  │                    └──────────┤
  │                               │
  │  200 OK                       │
  │  Set-Cookie: accessToken=...  │
  │  Set-Cookie: refreshToken=... │
  │  { user data }                │
  │◄──────────────────────────────│
```

### Logout Flow

```
Client                          Server
  │                               │
  │  POST /api/auth/logout        │
  │  Cookie: refreshToken=...     │
  │──────────────────────────────►│
  │                               │
  │                    ┌──────────┤
  │                    │ 1. Read refreshToken from cookies
  │                    │ 2. SHA-256 hash the token
  │                    │ 3. UPDATE refresh_tokens
  │                    │    SET is_revoked = 1,
  │                    │        revoked_at = NOW()
  │                    │    WHERE token_hash = ?
  │                    │ 4. Delete accessToken cookie
  │                    │ 5. Delete refreshToken cookie
  │                    └──────────┤
  │                               │
  │  200 OK                       │
  │  Set-Cookie: accessToken=;    │
  │  Set-Cookie: refreshToken=;   │
  │◄──────────────────────────────│
```

---

## Token Strategy

The system uses a **dual JWT token strategy**:

### Access Token

| Property  | Value                             |
| --------- | --------------------------------- |
| Purpose   | Authorize API requests            |
| Payload   | `{ sub: userId }`                 |
| Secret    | `JWT_ACCESS_SECRET`               |
| Lifetime  | Short (e.g., `15m`)               |
| Storage   | HTTP-only cookie                  |
| Revocable | No (stateless, expires naturally) |

### Refresh Token

| Property  | Value                                    |
| --------- | ---------------------------------------- |
| Purpose   | Obtain new access tokens                 |
| Payload   | `{ sub: userId }`                        |
| Secret    | `JWT_REFRESH_SECRET`                     |
| Lifetime  | Long (e.g., `7d`)                        |
| Storage   | HTTP-only cookie + SHA-256 hash in MySQL |
| Revocable | Yes (via `is_revoked` flag in DB)        |

### Why two tokens?

- **Access tokens** are short-lived and stateless — the server never needs to query the DB to verify them. This keeps most API requests fast.
- **Refresh tokens** are long-lived but server-tracked — they can be instantly revoked on logout, password change, or security events.

### Token Hashing

Refresh tokens are **never stored in plaintext** in the database. Before persisting:

```typescript
// src/shared/utils/hash.ts
import crypto from "crypto";

export function createHash(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}
```

This means even if the database is compromised, the raw JWT tokens cannot be recovered.

---

## Cookie Security

All auth cookies are configured with security best practices:

```typescript
// src/modules/auth/utils/cookies.ts
response.cookies.set("accessToken", accessToken, {
  httpOnly: true, // Not accessible via document.cookie
  secure: env.NODE_ENV === "production", // HTTPS-only in production
  sameSite: "strict", // No cross-site requests
  path: "/", // Available to all routes
  maxAge: durationToSeconds(env.JWT_ACCESS_EXPIRES_IN),
});
```

| Flag       | Value                  | Protection                         |
| ---------- | ---------------------- | ---------------------------------- |
| `httpOnly` | `true`                 | Blocks XSS from reading cookies    |
| `secure`   | `true` in production   | Prevents cleartext transmission    |
| `sameSite` | `strict`               | Blocks CSRF via cross-origin forms |
| `path`     | `/`                    | Cookie sent with all routes        |
| `maxAge`   | Matches JWT expiration | Auto-cleanup by browser            |

**Logout** deletes both cookies from the response:

```typescript
export function clearAuthCookies(response: NextResponse): void {
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
}
```

---

## Role-Based Access Control (RBAC)

### Roles

Defined in `src/database/data/roles.ts` and seeded into the `roles` table:

| Role              | Slug                | Description                          |
| ----------------- | ------------------- | ------------------------------------ |
| Super Admin       | `super-admin`       | Full system access (all permissions) |
| Editor            | `editor`            | Pages, blogs, media management       |
| Marketing Manager | `marketing-manager` | Blogs, SEO, leads, analytics         |
| Content Manager   | `content-manager`   | Pages, services, media               |
| Sales Manager     | `sales-manager`     | Contacts, leads                      |

### Permission Format

Permissions follow a `module.action` convention:

```
page.create    page.read    page.update    page.delete    page.publish
blog.create    blog.read    blog.update    blog.delete    blog.publish
seo.view       seo.manage
lead.view      lead.export
media.view     media.upload media.update   media.delete   media.manage
```

### Role-Permission Matrix (Summary)

| Permission Area | Super Admin | Editor | Marketing Mgr | Content Mgr | Sales Mgr |
| --------------- | :---------: | :----: | :-----------: | :---------: | :-------: |
| Pages           |     ✅      |   ✅   |      ❌       |     ✅      |    ❌     |
| Page Builder    |     ✅      |   ✅   |      ❌       |     ✅      |    ❌     |
| Blogs           |     ✅      |   ✅   |      ✅       |     ❌      |    ❌     |
| Blog Categories |     ✅      |   ✅   |      ✅       |     ❌      |    ❌     |
| Blog Tags       |     ✅      |   ✅   |      ✅       |     ❌      |    ❌     |
| Media           |     ✅      |   ✅   |      ❌       |     ✅      |    ❌     |
| SEO             |     ✅      |   ❌   |      ✅       |     ❌      |    ❌     |
| Redirects       |     ✅      |   ❌   |      ✅       |     ❌      |    ❌     |
| Sitemap         |     ✅      |   ❌   |      ✅       |     ❌      |    ❌     |
| Leads           |     ✅      |   ❌   |      ✅       |     ❌      |    ✅     |
| Contacts        |     ✅      |   ❌   |      ❌       |     ❌      |    ✅     |
| Services        |     ✅      |   ❌   |      ❌       |     ✅      |    ❌     |
| Analytics       |     ✅      |   ❌   |      ✅       |     ❌      |    ❌     |
| User Management |     ✅      |   ❌   |      ❌       |     ❌      |    ❌     |
| Audit Logs      |     ✅      |   ❌   |      ❌       |     ❌      |    ❌     |

> **Note:** Super Admin is granted all permissions via the `"*"` wildcard in seed data. Any new permission added to the system is automatically available to Super Admin.

---

## Error Handling

The system uses a **centralized error handler** (`handleApiError`) that produces consistent JSON responses.

### Error Classes

#### `AppError`

General application errors with HTTP status codes.

```typescript
// src/lib/errors/app-error.ts
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}
```

**Usage:** `throw new AppError("Invalid email or password", 401)`

#### `ValidationError`

Wraps Zod validation failures with field-level detail.

```typescript
// src/lib/errors/validation-error.ts
export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly zodError: ZodError,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}
```

### Error Response Formats

**Validation Error (400):**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Please enter a valid email address." },
    { "field": "password", "message": "Password is required." }
  ]
}
```

**Application Error (e.g., 401):**

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**Unhandled Error (500):**

```json
{
  "success": false,
  "message": "Internal server error"
}
```

### Error Handler Priority

```
1. ValidationError  → 400 + field-level errors
2. AppError         → Dynamic status code + message
3. Unknown/Error    → 500 + generic message (no leak)
```

---

## Project Structure

```
src/
├── app/
│   └── api/
│       └── auth/
│           ├── login/
│           │   └── route.ts          ← POST /api/auth/login
│           └── logout/
│               └── route.ts          ← POST /api/auth/logout
│
├── config/
│   └── env.ts                        ← Zod-validated environment variables
│
├── database/
│   ├── connection.ts                 ← MySQL connection pool (mysql2/promise)
│   ├── data/
│   │   ├── roles.ts                  ← Role definitions
│   │   ├── permissions.ts            ← Permission definitions
│   │   ├── rolePermissions.ts        ← Role ↔ Permission mappings
│   │   └── superAdmin.ts             ← Bootstrap admin credentials (from env)
│   ├── migrations/
│   │   └── auth/
│   │       ├── index.ts              ← Migration runner (batch-based, transactional)
│   │       ├── 001_create_roles.sql
│   │       ├── 002_create_permissions.sql
│   │       ├── 003_create_role_permissions.sql
│   │       ├── 004_create_users.sql
│   │       ├── 005_create_refresh_tokens.sql
│   │       ├── 006_create_password_reset_tokens.sql
│   │       ├── 007_create_email_verification_tokens.sql
│   │       └── 008_create_audit_logs.sql
│   └── seeds/
│       ├── index.ts                  ← Seed runner (ordered execution)
│       ├── roles.seed.ts             ← Upserts roles
│       ├── permissions.seed.ts       ← Upserts permissions
│       ├── rolePermission.seed.ts    ← Maps roles to permissions
│       └── superAdmin.seed.ts        ← Creates bootstrap admin user
│
├── lib/
│   ├── errors/
│   │   ├── app-error.ts              ← AppError (status code + message)
│   │   └── validation-error.ts       ← ValidationError (wraps ZodError)
│   ├── http/
│   │   ├── handle-api-error.ts       ← Centralized error → NextResponse
│   │   └── success-response.ts       ← Standardized success NextResponse
│   └── validation/
│       └── validation.ts             ← Generic Zod validate() wrapper
│
├── modules/
│   └── auth/
│       ├── constants/
│       │   ├── roles.ts              ← UserRole enum-like object
│       │   └── permissions.ts        ← PERMISSIONS constant map
│       ├── repositories/
│       │   ├── user.repository.ts    ← findUserByEmail()
│       │   └── refresh-token.repository.ts  ← createRefreshToken(), revokeRefreshToken()
│       ├── services/
│       │   ├── login.service.ts      ← loginService()
│       │   └── logout.service.ts     ← logoutService()
│       ├── types/
│       │   ├── user.type.ts          ← User, UserWithPassword interfaces
│       │   └── login-response.type.ts
│       ├── utils/
│       │   ├── cookies.ts            ← setAuthCookies(), clearAuthCookies()
│       │   ├── jwt.ts                ← generateAccessToken(), generateRefreshToken(), duration helpers
│       │   └── password.ts           ← hashPassword(), comparePassword()
│       └── validators/
│           └── login.schema.ts       ← Zod schema + LoginInput type
│
├── shared/
│   └── utils/
│       └── hash.ts                   ← SHA-256 hashing utility
│
└── docs/
    └── authentication.md             ← This document
```

---

## Database Setup

### Prerequisites

- MySQL 8.0+ running locally or remotely
- Node.js 18+
- All environment variables set in `.env.local`

### Run Migrations

Creates all required tables in dependency order:

```bash
npm run db:migrate
```

This runs `tsx src/database/migrations/auth/index.ts`, which:

1. Creates a `migrations` tracking table (if not exists)
2. Reads all `.sql` files matching `NNN_*.sql` pattern
3. Skips already-executed migrations
4. Executes each pending migration in a **transaction** (rollback on failure)
5. Records the migration name and batch number

### Run Seeds

Populates initial data (roles, permissions, role mappings, super admin):

```bash
npm run db:seed
```

**Execution order:**

1. `seedRoles()` — Upserts the 5 system roles
2. `seedPermissions()` — Upserts all permission definitions
3. `seedRolePermissions()` — Maps permissions to roles (Super Admin gets `*`)
4. `seedSuperAdmin()` — Creates the bootstrap admin account (skips if exists)

> **Idempotent:** Both migrations and seeds can be run multiple times safely. Migrations track execution state, and seeds use `ON DUPLICATE KEY UPDATE` or existence checks.

---

## Security Considerations

### What's implemented ✅

| Measure               | Implementation                                           |
| --------------------- | -------------------------------------------------------- |
| Password hashing      | bcrypt with 12 salt rounds                               |
| Token storage         | HTTP-only, secure, SameSite=strict cookies               |
| Refresh token hashing | SHA-256 before database storage                          |
| Token revocation      | Server-side revocation on logout                         |
| Input validation      | Zod schemas on all endpoints                             |
| Error message safety  | Generic messages for auth failures (no user enumeration) |
| Soft deletes          | Deleted users excluded from login queries                |
| Account status checks | Inactive/suspended accounts cannot log in                |
| Env validation        | Fail-fast on missing/invalid config                      |
| Parameterized queries | All SQL uses prepared statements (no injection)          |

### Database schema ready (not yet implemented in code) 🔶

| Feature                | DB Table Ready                  | Notes                               |
| ---------------------- | ------------------------------- | ----------------------------------- |
| Failed login tracking  | `users.failed_login_attempts`   | Column exists, logic not wired      |
| Account lockout        | `users.locked_until`            | Column exists, logic not wired      |
| Password reset         | `password_reset_tokens`         | Table created, no endpoint yet      |
| Email verification     | `email_verification_tokens`     | Table created, no endpoint yet      |
| Audit logging          | `audit_logs`                    | Table created, no logging logic yet |
| Device/IP tracking     | `refresh_tokens.device_info/ip` | Columns exist, not populated        |
| Token refresh endpoint | —                               | Refresh token flow not implemented  |

### Recommended future additions 🔲

- **Rate limiting** — Protect `/api/auth/login` from brute-force attacks
- **CSRF protection** — Add CSRF tokens for non-API form submissions
- **Token refresh endpoint** — `POST /api/auth/refresh` to rotate tokens
- **Revoke all sessions** — Clear all refresh tokens for a user on password change
- **IP-based anomaly detection** — Flag logins from new devices/locations
- **Refresh token rotation** — Issue a new refresh token on each use, revoke the old one

---

## Password Hashing

Passwords are hashed with **bcryptjs** using 12 salt rounds:

```typescript
// src/modules/auth/utils/password.ts
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
```

**Why 12 rounds?** It provides a strong balance between security and performance (~250ms per hash on modern hardware), making brute-force attacks computationally expensive.

---

## Validation Layer

All incoming request data is validated before reaching the service layer:

```typescript
// src/lib/validation/validation.ts
export function validate<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ValidationError("Validation failed", result.error);
  }

  return result.data;
}
```

This pattern:

1. Uses `safeParse` to avoid unhandled exceptions
2. Wraps failures in a custom `ValidationError`
3. Returns typed, validated data on success
4. Ensures the service layer always receives clean, typed input

### POST /api/auth/refresh

Goal

Access Token Expired
↓
Use Refresh Token
↓
Issue New Access Token

## Responsibilities:

Read refresh token cookie
↓
Call refreshTokenService()
↓
Set new access token cookie
↓
Return success



Verify refresh JWT
↓
Hash refresh token
↓
Find token in DB
↓
Check revoked
↓
Check expires_at
↓
Generate new access token
↓
Return access token
