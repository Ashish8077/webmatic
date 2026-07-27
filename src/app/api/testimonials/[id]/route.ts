import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { deleteTestimonialService } from "@/modules/testimonials/services/delete-testimonial.service";
import { getTestimonialService } from "@/modules/testimonials/services/get-testimonial.service";
import { updateTestimonialService } from "@/modules/testimonials/services/update-testimonial.service";
import {
  UpdateTestimonialInput,
  updateTestimonialSchema,
} from "@/modules/testimonials/validation/update-testimonial.schema";
import { IdRouteParams } from "@/shared/types/route-params";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { idParamSchema } from "@/shared/utils/validators/route-params.schema.";
import { validate } from "@/shared/utils/validators/validation";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    await requireAuth();

    const { id: testimonialId } = validate(idParamSchema, await params);

    const testimonialData = await getTestimonialService(testimonialId);

    return successResponse({
      message: "Testimonial fetched successfully",
      data: testimonialData,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id: testimonialId } = validate(idParamSchema, await params);

    const updateData: UpdateTestimonialInput = validate(
      updateTestimonialSchema,
      await request.json(),
    );

    await updateTestimonialService(testimonialId, updateData, user);

    return successResponse({
      message: "Testimonial updated successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const { id: testimonialId } = validate(idParamSchema, await params);

    await deleteTestimonialService(testimonialId, user);

    return successResponse({
      message: "Testimonial deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
