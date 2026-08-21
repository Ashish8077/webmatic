"use client";

import type { ReactNode } from "react";

import type { Permission } from "../constants/permissions";
import { usePermissions } from "../api/use-has-permission";

interface PermissionGateProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGate({
  permission,
  children,
  fallback = null,
}: PermissionGateProps) {
  const { has } = usePermissions();

  if (!has(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
