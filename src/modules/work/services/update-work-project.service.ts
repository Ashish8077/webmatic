import { AppError } from "@/shared/utils/errors/app-error";
import { handleDuplicateConstraint } from "@/shared/utils/errors/database-error.util";

import {
  updateWorkProject,
  findWorkProjectByTitleOrSlugExcludingId,
  findWorkProjectById,
} from "../repositories/work-project.repository";
import { UpdateWorkProjectInput } from "../validation/work-project.validation";

import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { toUpdateWorkProjectPayload } from "../mapper/work-project.mapper";
import { revalidatePath } from "next/cache";

export async function updateWorkProjectService(
  id: number,
  projectData: UpdateWorkProjectInput,
  user: AuthUser,
): Promise<boolean> {
  requirePermission(user, PERMISSIONS.WORK_UPDATE);
  if (projectData.status === "published") {
    requirePermission(user, PERMISSIONS.WORK_PUBLISH);
  }

  try {
    const existing = await findWorkProjectById(id);
    if (!existing) {
      throw new AppError("Work project not found", 404);
    }

    if (projectData.title || projectData.slug) {
      const conflict = await findWorkProjectByTitleOrSlugExcludingId(
        projectData.title,
        projectData.slug,
        id,
      );

      if (conflict) {
        if (conflict.title?.trim() === projectData.title?.trim()) {
          throw new AppError("Work project title already exists", 409, {
            title: ["Work project title already exists."],
          });
        }
        throw new AppError("Work project slug already exists", 409, {
          slug: ["Work project slug already exists."],
        });
      }
    }

    const payload = toUpdateWorkProjectPayload(projectData);

    if (projectData.status && projectData.status !== existing.status) {
      if (projectData.status === "published") {
        payload.published_at = existing.published_at || new Date();
      }
    }

    const success = await updateWorkProject(id, payload, user.userId);

    if (success) {
      revalidatePath("/");
      revalidatePath("/work");
      if (existing.slug) {
        revalidatePath(`/work/${existing.slug}`);
      }
      if (projectData.slug && projectData.slug !== existing.slug) {
        revalidatePath(`/work/${projectData.slug}`);
      }
    }

    return success;
  } catch (error) {
    handleDuplicateConstraint(error, {
      uk_work_projects_slug: {
        field: "slug",
        message: "Work project slug already exists.",
      },
    });
    throw error;
  }
}
