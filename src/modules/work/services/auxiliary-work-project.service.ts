import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AppError } from "@/shared/utils/errors/app-error";
import {
  findWorkProjectById,
  updateWorkProjectStatus,
  updateWorkProjectFeatured,
  softDeleteWorkProject,
} from "../repositories/work-project.repository";
import { revalidatePath } from "next/cache";

export async function updateWorkProjectStatusService(
  id: number,
  status: "draft" | "published",
  user: AuthUser,
): Promise<boolean> {
  requirePermission(user, PERMISSIONS.WORK_UPDATE);
  if (status === "published") {
    requirePermission(user, PERMISSIONS.WORK_PUBLISH);
  }

  const existing = await findWorkProjectById(id);
  if (!existing) {
    throw new AppError("Work project not found", 404);
  }

  const success = await updateWorkProjectStatus(id, status, user.userId);
  if (success) {
    revalidatePath("/");
    revalidatePath("/work");
    if (existing.slug) {
      revalidatePath(`/work/${existing.slug}`);
    }
  }
  return success;
}

export async function updateWorkProjectFeaturedService(
  id: number,
  isFeatured: boolean,
  user: AuthUser,
): Promise<boolean> {
  requirePermission(user, PERMISSIONS.WORK_UPDATE);

  const existing = await findWorkProjectById(id);
  if (!existing) {
    throw new AppError("Work project not found", 404);
  }

  const success = await updateWorkProjectFeatured(id, isFeatured, user.userId);
  if (success) {
    revalidatePath("/");
    revalidatePath("/work");
  }
  return success;
}

export async function deleteWorkProjectService(
  id: number,
  user: AuthUser,
): Promise<boolean> {
  requirePermission(user, PERMISSIONS.WORK_DELETE);

  const existing = await findWorkProjectById(id);
  if (!existing) {
    throw new AppError("Work project not found", 404);
  }

  const success = await softDeleteWorkProject(id, user.userId);
  if (success) {
    revalidatePath("/");
    revalidatePath("/work");
    if (existing.slug) {
      revalidatePath(`/work/${existing.slug}`);
    }
  }
  return success;
}
