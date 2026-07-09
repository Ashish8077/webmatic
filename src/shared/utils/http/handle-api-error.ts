import { NextResponse } from "next/server";

import { AppError } from "@/shared/utils/errors/app-error";
import { isDuplicateKeyError } from "@/shared/utils/errors/database-error.util";
import { ValidationError } from "@/shared/utils/errors/validation-error";
import {
  createValidationErrors,
  type ValidationErrors,
} from "@/shared/utils/errors/validation-errors";

interface ErrorResponseBody {
  success: false;
  message: string;
  code?: string;
  errors?: ValidationErrors;
}

function errorResponse(body: ErrorResponseBody, status: number): NextResponse {
  return NextResponse.json(body, { status });
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ValidationError) {
    return errorResponse(
      {
        success: false,
        message: error.message,
        code: "VALIDATION_ERROR",
        errors: error.errors,
      },
      error.statusCode,
    );
  }

  if (error instanceof AppError) {
    return errorResponse(
      {
        success: false,
        message: error.message,
        ...(error.code && { code: error.code }),
        ...(error.errors && { errors: error.errors }),
      },
      error.statusCode,
    );
  }

  if (error instanceof SyntaxError) {
    return errorResponse(
      {
        success: false,
        message: "Invalid JSON payload",
        code: "INVALID_JSON",
        errors: createValidationErrors("_root", "Invalid JSON payload."),
      },
      400,
    );
  }

  if (isDuplicateKeyError(error)) {
    return errorResponse(
      {
        success: false,
        message: "Duplicate value violates a unique constraint",
        code: "DUPLICATE_VALUE",
        errors: createValidationErrors(
          "_root",
          "A record with this value already exists.",
        ),
      },
      409,
    );
  }

  console.error(error);

  return errorResponse(
    {
      success: false,
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    },
    500,
  );
}
