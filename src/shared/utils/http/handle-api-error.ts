import { ZodIssue } from "zod";
import { NextResponse } from "next/server";

import { AppError } from "@/shared/utils/errors/app-error";
import { ValidationError } from "@/shared/utils/errors/validation-error";

export function handleApiError(error: unknown) {
  if (error instanceof ValidationError) {
    return NextResponse.json(
      {
        success: false,
        message: "Validation failed",
        errors: error.zodError.issues.map((issue: ZodIssue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      {
        status: 400,
      },
    );
  }

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        ...(error.errors && { errors: error.errors }),
      },
      {
        status: error.statusCode,
      },
    );
  }

  if (error instanceof SyntaxError) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid JSON payload",
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "Internal server error",
    },
    {
      status: 500,
    },
  );
}
