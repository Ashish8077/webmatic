export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  profile_image: string | null;
  status: "active" | "inactive" | "suspended";
  email_verified: boolean;
  failed_login_attempts: number;
  locked_until: Date | null;
  last_login_at: Date | null;
  password_changed_at: Date | null;
}

// Full user row including sensitive fields (only use server-side)
export interface UserWithPassword extends User {
  password_hash: string;
}
