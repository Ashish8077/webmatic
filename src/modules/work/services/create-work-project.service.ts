import { AppError } from "@/shared/utils/errors/app-error";
import { handleDuplicateConstraint } from "@/shared/utils/errors/database-error.util";

import {
  insertWorkProject,
  findWorkProjectSlug,
} from "../repositories/work-project.repository";
import { CreateWorkProjectInput } from "../validation/work-project.validation";


import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { toCreateWorkProjectPayload } from "../mapper/work-project.mapper";
import { CreateWorkProjectResponse } from "../types/work-project.types";
import { revalidatePath } from "next/cache";

export async function createWorkProjectService(
  projectData: CreateWorkProjectInput,
  user: AuthUser,
): Promise<CreateWorkProjectResponse> {
  requirePermission(user, PERMISSIONS.WORK_CREATE);
  // Wait, I should probably check `permissions.ts`.
  
  try {
    const existingProject = await findWorkProjectSlug(
      projectData.title,
      projectData.slug,
    );

    if (existingProject) {
      if (existingProject.title?.trim() === projectData.title.trim()) {
        throw new AppError("Work project title already exists", 409, {
          title: ["Work project title already exists."],
        });
      }
      throw new AppError("Work project slug already exists", 409, {
        slug: ["Work project slug already exists."],
      });
    }

    const payload = toCreateWorkProjectPayload(projectData);
    const projectId = await insertWorkProject(payload, user.userId);

    revalidatePath("/");
    revalidatePath("/work");

    return {
      project: {
        id: projectId,
        title: payload.title,
        slug: payload.slug,
        status: payload.status as "draft" | "published",
      },
    };
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
