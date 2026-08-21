import { findAllRoles } from "../repositories/role.repository";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";

export async function getRolesService(user: AuthUser) {
  requirePermission(user, PERMISSIONS.USER_VIEW); // Assume someone viewing users can view roles
  const roles = await findAllRoles();
  
  // Return name and id for frontend dropdown
  return roles.map(r => ({ id: r.id, name: r.name }));
}
