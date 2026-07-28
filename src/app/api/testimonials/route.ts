import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { createTestimonialService } from "@/modules/testimonials/services/create-testimonial.service";
import { getTestimonialsService } from "@/modules/testimonials/services/get-testimonials.service";
import {
  CreateTestimonialInput,
  createTestimonialSchema,
} from "@/modules/testimonials/validation/create-testimonial.schema";
import { getTestimonialsQuerySchema } from "@/modules/testimonials/validation/get-testimonials-query.schema";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    
    const createTestimonialData: CreateTestimonialInput = validate(
      createTestimonialSchema,
      await req.json(),
    );
    const testimonial = await createTestimonialService(createTestimonialData, user);
    return successResponse({
      message: "Testimonial created successfully",
      statusCode: 201,
      data: testimonial,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    await requireAuth();
    const { searchParams } = new URL(request.url);

    const query = validate(
      getTestimonialsQuerySchema,
      Object.fromEntries(searchParams.entries()),
    );

    const testimonialsData = await getTestimonialsService(query);

    return successResponse({
      message: "Testimonials fetched successfully",
      data: testimonialsData,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
