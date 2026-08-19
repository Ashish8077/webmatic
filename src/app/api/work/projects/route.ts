import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { createWorkProjectService } from "@/modules/work/services/create-work-project.service";
import { getWorkProjectsService } from "@/modules/work/services/get-work-projects.service";
import {
  CreateWorkProjectInput,
  createWorkProjectSchema,
} from "@/modules/work/validation/work-project.validation";
import { getWorkProjectsQuerySchema } from "@/modules/work/validation/get-work-projects-query.schema";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    
    const createData: CreateWorkProjectInput = validate(
      createWorkProjectSchema,
      await req.json(),
    );
    const project = await createWorkProjectService(createData, user);
    return successResponse({
      message: "Work project created successfully",
      statusCode: 201,
      data: project,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    requirePermission(user, PERMISSIONS.WORK_VIEW);
    const { searchParams } = new URL(request.url);

    const query = validate(
      getWorkProjectsQuerySchema,
      Object.fromEntries(searchParams.entries()),
    );

    const projectsData = await getWorkProjectsService(query);

    return successResponse({
      message: "Work projects fetched successfully",
      data: projectsData,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
