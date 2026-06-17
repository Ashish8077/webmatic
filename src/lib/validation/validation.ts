import { ZodType } from "zod";
import { ValidationError } from "@/lib/errors/validation-error";

export function validate<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ValidationError("Validation failed", result.error);
  }

  return result.data;
}
