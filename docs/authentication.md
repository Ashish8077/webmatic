# Authentication Module

> **Status:** Frozen — do not modify without explicit approval.

---

## Login Flow

**Endpoint:** `POST /api/auth/login`

```
Client → POST /api/auth/login { email, password }
```

1. **Validate** the request body against `loginSchema` (Zod).
   - `email` — valid email, trimmed, lowercased.
   - `password` — required, 1–255 chars.
2. **Find user** by email (`users` table, `JOIN user_roles → roles`). Excludes soft-deleted rows (`deleted_at IS NULL`).
3. **Guard: inactive account** — if `user.status !== "active"` → `403 Account is not active`.
4. **Verify password** — bcrypt compare (12 salt rounds).
5. **Generate tokens**
   - Access token — `jwt.sign({ sub: userId }, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRES_IN })`
   - Refresh token — `jwt.sign({ sub: userId }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN })`
6. **Persist refresh token** — SHA-256 hash of the raw refresh token is stored in `refresh_tokens` with an `expires_at` date.
7. **Guard: no role** — if user has no `role_slug` → `403 User role not assigned`.
8. **Set cookies** — both `accessToken` and `refreshToken` are written as `httpOnly`, `sameSite: strict`, `secure` (in production) cookies.
9. **Return** `200` with `{ user: { id, firstName, lastName, email, role } }`. Tokens are **never** in the response body.

---

## Logout Flow

**Endpoint:** `POST /api/auth/logout`

```
Client → POST /api/auth/logout (no body)
```

1. Read `refreshToken` from the cookie jar.
2. If a refresh token exists:
   - Hash it (SHA-256).
   - Mark the matching row in `refresh_tokens` as revoked (`is_revoked = 1`, `revoked_at = CURRENT_TIMESTAMP`).
3. **Clear cookies** — delete both `accessToken` and `refreshToken` cookies.
4. **Return** `200 Logged out successfully`.

Logout is **idempotent** — if no cookie is present the endpoint still returns `200`.

---

## Refresh Flow

**Endpoint:** `POST /api/auth/refresh`

```
Client → POST /api/auth/refresh (no body)
```

1. Read `refreshToken` from the cookie jar.
2. **Guard: missing** — `401 Refresh token not found`.
3. Hash the token (SHA-256) and look it up in `refresh_tokens`.
4. **Guard: not found** — `401 Refresh token is invalid or expired`.
5. **Guard: revoked** — `401 Refresh token is revoked`.
6. **Guard: expired** — `401 Refresh token is expired` (compares `expires_at < now`).
7. Generate a **new access token** for the same `user_id`.
8. Re-set both `accessToken` and `refreshToken` cookies (same raw refresh token is reused).
9. **Return** `200 Token refreshed successfully`.

> **TODO (in code):** Implement refresh-token rotation — revoke current token, generate a new one, and store the new hash.

---

## RBAC Flow

### Model

```
users ──1:N── user_roles ──N:1── roles ──1:N── role_permissions ──N:1── permissions
```

A user is assigned **one role** via `user_roles`. Each role maps to a set of permissions via `role_permissions`. Permissions use a `module.action` slug format (e.g. `page.create`, `blog.delete`).

### Roles (seeded)

| Slug                | Name              | Permissions                                                            |
| ------------------- | ----------------- | ---------------------------------------------------------------------- |
| `super-admin`       | Super Admin       | `*` (all permissions)                                                  |
| `editor`            | Editor            | page, page-builder, blog, blog-category, blog-tag, media               |
| `marketing-manager` | Marketing Manager | blog, blog-category, blog-tag, seo, redirect, sitemap, lead, analytics |
| `content-manager`   | Content Manager   | page, page-builder, service, media                                     |
| `sales-manager`     | Sales Manager     | contact, lead                                                          |

### Permission Check

Two functions are used:

- **`requirePermission(userId, permission)`** — throws `403 Forbidden` if the user does not have the permission. Used as a guard at the top of route handlers.
- **`hasPermission(userId, permission)`** — returns `boolean`. DB query joins `permissions → role_permissions → user_roles` and checks if a matching row exists.

### Permissions Endpoint

**Endpoint:** `GET /api/auth/permissions`

Returns the full list of permission slugs for the authenticated user, resolved through the role chain.

### Current User Endpoint

**Endpoint:** `GET /api/auth/me`

Returns `{ id, firstName, lastName, email }` for the authenticated user. Requires a valid `accessToken` cookie.

---

## Cookies

Two `httpOnly` cookies carry the session:

| Cookie         | Purpose                      | Flags                                                      | Max-Age Source           |
| -------------- | ---------------------------- | ---------------------------------------------------------- | ------------------------ |
| `accessToken`  | Short-lived JWT for API auth | `httpOnly`, `secure` (prod), `sameSite: strict`, `path: /` | `JWT_ACCESS_EXPIRES_IN`  |
| `refreshToken` | Long-lived JWT for renewal   | `httpOnly`, `secure` (prod), `sameSite: strict`, `path: /` | `JWT_REFRESH_EXPIRES_IN` |

- Cookies are **set** via `setAuthCookies()` on login and refresh.
- Cookies are **cleared** via `clearAuthCookies()` on logout.
- Tokens are **never** returned in the JSON response body.

### Extracting the Authenticated User

`getAuthUser()` reads the `accessToken` cookie via Next.js `cookies()`, verifies it with `jwt.verify`, and returns `{ userId }`.

---

## JWT Expiry

| Token         | Secret Env Var       | Expiry Env Var           | Format     |
| ------------- | -------------------- | ------------------------ | ---------- |
| Access Token  | `JWT_ACCESS_SECRET`  | `JWT_ACCESS_EXPIRES_IN`  | e.g. `15m` |
| Refresh Token | `JWT_REFRESH_SECRET` | `JWT_REFRESH_EXPIRES_IN` | e.g. `7d`  |

Duration strings use a single-char suffix: `m` (minutes), `h` (hours), `d` (days).

Utility functions in `lib/jwt.ts`:

- `durationToSeconds("15m")` → `900`
- `durationToDate("7d")` → `Date` 7 days from now (used for `refresh_tokens.expires_at`)

The **access token** has a dual expiry: JWT-internal (`exp` claim) and cookie `maxAge` — both derived from the same env var. The **refresh token** has a triple check: JWT `exp`, cookie `maxAge`, and the `expires_at` column in the database.

Passwords are hashed with **bcrypt** using 12 salt rounds.

---

## Database Tables

### `users`

| Column                  | Type                                    | Notes                       |
| ----------------------- | --------------------------------------- | --------------------------- |
| `id`                    | `BIGINT UNSIGNED` PK AUTO_INCREMENT     |                             |
| `first_name`            | `VARCHAR(100)` NOT NULL                 |                             |
| `last_name`             | `VARCHAR(100)` NOT NULL                 |                             |
| `email`                 | `VARCHAR(255)` NOT NULL UNIQUE          |                             |
| `phone`                 | `VARCHAR(20)` NULL                      |                             |
| `password_hash`         | `VARCHAR(255)` NOT NULL                 | bcrypt                      |
| `profile_image`         | `VARCHAR(500)` NULL                     |                             |
| `status`                | `ENUM('active','inactive','suspended')` | Default `active`            |
| `email_verified`        | `BOOLEAN` NOT NULL                      | Default `FALSE`             |
| `email_verified_at`     | `TIMESTAMP` NULL                        |                             |
| `failed_login_attempts` | `TINYINT UNSIGNED` NOT NULL             | Default `0`                 |
| `locked_until`          | `TIMESTAMP` NULL                        |                             |
| `password_changed_at`   | `TIMESTAMP` NULL                        |                             |
| `created_at`            | `TIMESTAMP` NOT NULL                    | Default `CURRENT_TIMESTAMP` |
| `updated_at`            | `TIMESTAMP` NOT NULL                    | Auto-update                 |
| `deleted_at`            | `TIMESTAMP` NULL                        | Soft delete                 |

Indexes: `idx_status`, `idx_deleted_at`.

---

### `roles`

| Column       | Type                                | Notes |
| ------------ | ----------------------------------- | ----- |
| `id`         | `BIGINT UNSIGNED` PK AUTO_INCREMENT |       |
| `name`       | `VARCHAR(50)` NOT NULL              |       |
| `slug`       | `VARCHAR(50)` NOT NULL UNIQUE       |       |
| `created_at` | `TIMESTAMP` NOT NULL                |       |
| `updated_at` | `TIMESTAMP` NOT NULL                |       |

---

### `permissions`

| Column       | Type                                | Notes               |
| ------------ | ----------------------------------- | ------------------- |
| `id`         | `BIGINT UNSIGNED` PK AUTO_INCREMENT |                     |
| `name`       | `VARCHAR(150)` NOT NULL             |                     |
| `slug`       | `VARCHAR(150)` NOT NULL UNIQUE      | e.g. `page.create`  |
| `module`     | `VARCHAR(100)` NOT NULL             | e.g. `page`, `blog` |
| `created_at` | `TIMESTAMP` NOT NULL                |                     |
| `updated_at` | `TIMESTAMP` NOT NULL                |                     |

---

### `user_roles`

| Column    | Type              | Notes                             |
| --------- | ----------------- | --------------------------------- |
| `user_id` | `BIGINT UNSIGNED` | FK → `users.id` ON DELETE CASCADE |
| `role_id` | `BIGINT UNSIGNED` | FK → `roles.id` ON DELETE CASCADE |

Composite PK: `(user_id, role_id)`.

---

### `role_permissions`

| Column          | Type              | Notes                                   |
| --------------- | ----------------- | --------------------------------------- |
| `role_id`       | `BIGINT UNSIGNED` | FK → `roles.id` ON DELETE CASCADE       |
| `permission_id` | `BIGINT UNSIGNED` | FK → `permissions.id` ON DELETE CASCADE |

Composite PK: `(role_id, permission_id)`.

---

### `refresh_tokens`

| Column        | Type                                | Notes                             |
| ------------- | ----------------------------------- | --------------------------------- |
| `id`          | `BIGINT UNSIGNED` PK AUTO_INCREMENT |                                   |
| `user_id`     | `BIGINT UNSIGNED` NOT NULL          | FK → `users.id` ON DELETE CASCADE |
| `token_hash`  | `VARCHAR(255)` NOT NULL UNIQUE      | SHA-256 of raw token              |
| `device_info` | `VARCHAR(255)` NULL                 | Reserved, not yet populated       |
| `ip_address`  | `VARCHAR(45)` NULL                  | Reserved, not yet populated       |
| `is_revoked`  | `TINYINT(1)` NOT NULL               | Default `0`                       |
| `expires_at`  | `TIMESTAMP` NOT NULL                |                                   |
| `revoked_at`  | `TIMESTAMP` NULL                    |                                   |
| `created_at`  | `TIMESTAMP` NOT NULL                |                                   |

Indexes: `idx_user_id`, `idx_token_hash`, `idx_expires_at`.

---

## File Map

```
src/modules/auth/
├── constants/
│   ├── permissions.ts          # PERMISSIONS enum-like object
│   └── roles.ts                # UserRole enum + type
├── lib/
│   ├── cookies.ts              # setAuthCookies / clearAuthCookies
│   ├── get-auth-user.ts        # getAuthUser() — read cookie → verify JWT
│   ├── jwt.ts                  # generate / verify tokens, duration helpers
│   ├── password.ts             # hashPassword / comparePassword (bcrypt)
│   └── types.ts                # AuthUser, JwtPayload interfaces
├── repositories/
│   ├── permission.repository.ts  # findPermissionsByUserId, hasPermission
│   ├── refresh-token.repository.ts # create / revoke / find refresh tokens
│   ├── user.repository.ts       # findUserByEmail, findUserById
│   └── types.ts                 # UserRow, RefreshTokenRow, PermissionRow
├── services/
│   ├── get-current-user.service.ts
│   ├── login.service.ts
│   ├── logout.service.ts
│   ├── permissions.service.ts
│   ├── refresh-token.service.ts
│   ├── require-permission.ts
│   └── types.ts                 # LoginResponse, RefreshTokenResponse, PermissionsResponse
└── validators/
    └── login.schema.ts          # Zod schema for login input

src/app/api/auth/
├── login/route.ts               # POST /api/auth/login
├── logout/route.ts              # POST /api/auth/logout
├── refresh/route.ts             # POST /api/auth/refresh
├── permissions/route.ts         # GET  /api/auth/permissions
└── me/route.ts                  # GET  /api/auth/me
```
