import type { Permission } from "../constants/permissions";
import { useCurrentUser } from "../hooks/use-current-user";

export function usePermissions() {
  const { data } = useCurrentUser();

  const permissions = data?.permissions ?? [];

  const has = (permission: Permission): boolean => {
    return permissions.includes(permission);
  };

  const hasAny = (...required: Permission[]): boolean => {
    return required.some((permission) => permissions.includes(permission));
  };

  const hasAll = (...required: Permission[]): boolean => {
    return required.every((permission) => permissions.includes(permission));
  };

  return {
    permissions,
    has,
    hasAny,
    hasAll,
  };
}
