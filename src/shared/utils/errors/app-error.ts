import {
  normalizeValidationErrors,
  type ValidationErrors,
} from "@/shared/utils/errors/validation-errors";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errors?: ValidationErrors;
  public readonly code?: string;
  public readonly isOperational = true;

  constructor(
    message: string,
    statusCode: number,
    errors?: ValidationErrors,
    code?: string,
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = normalizeValidationErrors(errors);
    this.code = code;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
