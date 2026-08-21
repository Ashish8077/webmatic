import { NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { validate } from "@/shared/utils/validators/validation";
import { getLeadsQuerySchema } from "@/modules/leads/validation/admin-lead.schema";
import { getLeadsService } from "@/modules/leads/services/get-leads.service";
import { successResponse } from "@/shared/utils/http/success-response";
import { handleApiError } from "@/shared/utils/http/handle-api-error";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const filters = validate(getLeadsQuerySchema, queryParams);

    const result = await getLeadsService(filters, user);

    return successResponse({
      data: result,
      message: "Leads retrieved successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
