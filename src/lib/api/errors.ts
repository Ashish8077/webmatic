import { type ValidationErrors } from "@/shared/utils/errors/validation-errors";

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  public readonly errors?: ValidationErrors;

  constructor(
    message: string,
    status: number,
    code?: string,
    errors?: ValidationErrors,
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}
