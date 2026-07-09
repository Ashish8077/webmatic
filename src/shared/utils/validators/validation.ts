import { ZodType } from "zod";
import { ValidationError } from "@/shared/utils/errors/validation-error";
import { formatZodValidationErrors } from "@/shared/utils/errors/zod-error-formatter";

export function validate<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ValidationError(
      "Validation failed",
      formatZodValidationErrors(result.error),
      { cause: result.error },
    );
  }

  return result.data;
}
