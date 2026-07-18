import { type ValidationErrors } from "@/shared/utils/errors/validation-errors";

export class ValidationError extends Error {
  public readonly statusCode = 400;

  constructor(
    message: string,
    public readonly errors: ValidationErrors,
    options?: ErrorOptions,
  ) {
    super(message, options);

    this.name = "ValidationError";

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
