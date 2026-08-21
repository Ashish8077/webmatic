import { NextResponse } from "next/server";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";
import { checkRateLimit } from "@/shared/utils/security/rate-limit";
import { verifyRecaptcha } from "@/shared/utils/security/recaptcha";
import { createLeadSchema, CreateLeadSchemaData } from "@/modules/leads/validation/create-lead.schema";
import { createLeadService } from "@/modules/leads/services/create-lead.service";
import { CreateLeadInput } from "@/modules/leads/types/repository.types";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // 1. Extract metadata
    const ipAddress = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // 2. Rate Limit
    await checkRateLimit(ipAddress);

    // 3. Parse and Validate
    const body = await request.json();
    const validatedData: CreateLeadSchemaData = validate(createLeadSchema, body);

    // 4. Verify reCAPTCHA
    await verifyRecaptcha(validatedData.recaptchaToken);

    // 5. Service Invocation
    const serviceInput: CreateLeadInput = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      message: validatedData.message,
      ipAddress,
      userAgent,
    };

    await createLeadService(serviceInput);

    // 6. Response (No internal DB IDs exposed)
    return successResponse({
      message: "Your message has been sent successfully.",
      statusCode: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
