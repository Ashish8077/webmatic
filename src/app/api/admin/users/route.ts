import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { createUserService } from "@/modules/users/services/create-user.service";
import { getUsersService } from "@/modules/users/services/get-users.service";
import {
  CreateUserInput,
  createUserSchema,
} from "@/modules/users/validation/create-user.schema";
import { getUsersQuerySchema } from "@/modules/users/validation/get-users-query.schema";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    
    const createUserData: CreateUserInput = validate(
      createUserSchema,
      await req.json(),
    );
    const createdUser = await createUserService(createUserData, user);
    
    return successResponse({
      message: "User created successfully",
      statusCode: 201,
      data: createdUser,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);

    const query = validate(
      getUsersQuerySchema,
      Object.fromEntries(searchParams.entries()),
    );

    const usersData = await getUsersService(query, user);

    return successResponse({
      message: "Users fetched successfully",
      data: usersData,
      statusCode: 200,
    });
  } catch (error) {
    console.error("USERS API ERROR:", error);
    return handleApiError(error);
  }
}
