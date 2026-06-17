import { ZodError } from "zod";

export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly zodError: ZodError,
  ) {
    super(message);

    this.name = "ValidationError";

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
