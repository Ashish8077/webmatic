export type ValidationErrors = Record<string, string[]>;

export const ROOT_ERROR_KEY = "_root";

type FieldPath = PropertyKey | PropertyKey[];

function normalizeFieldPath(field: FieldPath | null | undefined): string {
  if (Array.isArray(field)) {
    const path = field.map(String).filter(Boolean).join(".");
    return path || ROOT_ERROR_KEY;
  }

  if (field === null || field === undefined || field === "") {
    return ROOT_ERROR_KEY;
  }

  return String(field);
}

export function addValidationError(
  errors: ValidationErrors,
  field: FieldPath | null | undefined,
  message: string,
): ValidationErrors {
  const key = normalizeFieldPath(field);

  errors[key] = [...(errors[key] ?? []), message];

  return errors;
}

export function createValidationErrors(
  field: FieldPath | null | undefined,
  message: string,
): ValidationErrors {
  return addValidationError({}, field, message);
}

export function normalizeValidationErrors(
  errors?: ValidationErrors,
): ValidationErrors | undefined {
  if (!errors) return undefined;

  return Object.entries(errors).reduce<ValidationErrors>(
    (normalizedErrors, [field, messages]) => {
      const cleanMessages = messages.filter(Boolean);

      if (!cleanMessages.length) {
        return normalizedErrors;
      }

      normalizedErrors[normalizeFieldPath(field)] = cleanMessages;

      return normalizedErrors;
    },
    {},
  );
}
