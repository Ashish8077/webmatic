import { RowDataPacket } from "mysql2";

export interface UserRow extends RowDataPacket {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  password_hash: string;
  status: string;
  role_id: number | null;
  role_slug: string | null;
}

export interface UserPasswordRow extends RowDataPacket {
  id: number;
  password_hash: string;
}

export interface UserProfileRow extends RowDataPacket {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  profile_image_id: number | null;
  status: string;
  created_at: Date;
  role_slug: string | null;
  
  // Media join fields
  profile_image_url?: string | null;
  profile_image_storage_path?: string | null;
  profile_image_disk?: string | null;
  profile_image_type?: string | null;
  profile_image_name?: string | null;
}

export interface RefreshTokenRow extends RowDataPacket {
  id: number;
  user_id: number;
  token_hash: string;
  is_revoked: number;
  expires_at: Date;
}

export interface PermissionRow extends RowDataPacket {
  slug: string;
}

export interface AuthUserRow extends RowDataPacket {
  id: number;
  email: string;
}

export interface AuthPermissionRow extends RowDataPacket {
  role_slug: string;
  permission_slug: string;
}
