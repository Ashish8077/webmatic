import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { getWorkProjectByIdService } from "@/modules/work/services/get-work-project-details.service";
import { updateWorkProjectService } from "@/modules/work/services/update-work-project.service";
import { deleteWorkProjectService } from "@/modules/work/services/auxiliary-work-project.service";
import {
  UpdateWorkProjectInput,
  updateWorkProjectSchema,
} from "@/modules/work/validation/work-project.validation";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";
import { NextResponse } from "next/server";
import { AppError } from "@/shared/utils/errors/app-error";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    requirePermission(user, PERMISSIONS.WORK_VIEW);
    const { id } = await props.params;

    const projectId = parseInt(id, 10);
    if (isNaN(projectId)) {
      throw new AppError("Invalid work project ID", 400);
    }

    const project = await getWorkProjectByIdService(projectId);

    return successResponse({
      message: "Work project fetched successfully",
      data: project,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  req: Request,
  props: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id } = await props.params;

    const projectId = parseInt(id, 10);
    if (isNaN(projectId)) {
      throw new AppError("Invalid work project ID", 400);
    }

    const updateData: UpdateWorkProjectInput = validate(
      updateWorkProjectSchema,
      await req.json(),
    );

    await updateWorkProjectService(projectId, updateData, user);

    return successResponse({
      message: "Work project updated successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id } = await props.params;

    const projectId = parseInt(id, 10);
    if (isNaN(projectId)) {
      throw new AppError("Invalid work project ID", 400);
    }

    await deleteWorkProjectService(projectId, user);

    return successResponse({
      message: "Work project deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
