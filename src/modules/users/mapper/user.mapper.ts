import { UserListItem, UserDetail } from "../types/user.types";
import { UserModuleRow } from "../repositories/user.repository";
import { UserStatus } from "../constants/user.constants";

export function toUserListItems(rows: UserModuleRow[]): UserListItem[] {
  return rows.map((row) => ({
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    status: row.status as UserStatus,
    roleId: row.role_id,
    roleName: row.role_name,
    createdAt: row.created_at,
  }));
}

export function toUserDetail(row: UserModuleRow): UserDetail {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    status: row.status as UserStatus,
    roleId: row.role_id,
  };
}
