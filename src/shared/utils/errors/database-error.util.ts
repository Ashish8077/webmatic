import { AppError } from "@/shared/utils/errors/app-error";

export interface DatabaseError {
  code?: string;
  constraint?: string;
  message?: string;
  [key: string]: unknown;
}

export function isDuplicateKeyError(error: unknown): error is DatabaseError {
  return (
    error !== null &&
    typeof error === "object" &&
    "code" in error &&
    (error as Record<string, unknown>).code === "ER_DUP_ENTRY"
  );
}

export interface ConstraintMapping {
  [constraintName: string]: {
    field: string;
    message: string;
  };
}

export function getDuplicateConstraintName(error: unknown): string | undefined {
  if (!isDuplicateKeyError(error)) return undefined;

  if (error.constraint) return error.constraint;

  if (error.message) {
    const match = error.message.match(/for key '([^']+)'/);
    if (match && match[1]) {
      const key = match[1];
      return key.includes(".") ? key.split(".").pop() : key;
    }
  }

  return undefined;
}

export function handleDuplicateConstraint(
  error: unknown,
  mapping: ConstraintMapping,
): void {
  const constraintName = getDuplicateConstraintName(error);

  if (constraintName && mapping[constraintName]) {
    const { field, message } = mapping[constraintName];
    throw new AppError(message, 409, {
      [field]: [message],
    });
  }

  if (isDuplicateKeyError(error)) {
    throw new AppError("Duplicate value violates a unique constraint", 409, {
      _root: ["A record with this value already exists."],
    });
  }
}
