export interface DatabaseError {
  code?: string;
  constraint?: string;
  message?: string;
  [key: string]: any;
}

export function isDuplicateKeyError(error: unknown): error is DatabaseError {
  return (
    error !== null &&
    typeof error === "object" &&
    "code" in error &&
    (error as any).code === "ER_DUP_ENTRY"
  );
}
