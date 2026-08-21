import { NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { validate } from "@/shared/utils/validators/validation";
import { leadIdParamSchema, updateLeadCommandSchema, UpdateLeadCommandData } from "@/modules/leads/validation/admin-lead.schema";
import { getLeadByIdService } from "@/modules/leads/services/get-lead-by-id.service";
import { updateLeadService } from "@/modules/leads/services/update-lead.service";
import { deleteLeadService } from "@/modules/leads/services/delete-lead.service";
import { successResponse } from "@/shared/utils/http/success-response";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { IdRouteParams } from "@/shared/types/route-params";

export async function GET(
  request: Request,
  { params }: IdRouteParams
): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const { id: leadId } = validate(leadIdParamSchema, await params);
    const lead = await getLeadByIdService(leadId, user);

    return successResponse({
      data: lead,
      message: "Lead fetched successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: IdRouteParams
): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const { id: leadId } = validate(leadIdParamSchema, await params);
    const updateLeadData: UpdateLeadCommandData = validate(updateLeadCommandSchema, await request.json());

    await updateLeadService(leadId, updateLeadData, user);

    return successResponse({
      message: "Lead updated successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: IdRouteParams
): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const { id: leadId } = validate(leadIdParamSchema, await params);

    await deleteLeadService(leadId, user);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
