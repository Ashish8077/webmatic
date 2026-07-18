import { ZodError } from "zod";

import {
  addValidationError,
  type ValidationErrors,
} from "@/shared/utils/errors/validation-errors";

export function formatZodValidationErrors(error: ZodError): ValidationErrors {
  return error.issues.reduce<ValidationErrors>((errors, issue) => {
    return addValidationError(errors, issue.path, issue.message);
  }, {});
}
