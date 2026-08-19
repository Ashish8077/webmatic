import { AuthUser } from "@/modules/auth/types/auth-user";
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
