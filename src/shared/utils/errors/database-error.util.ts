export function isDuplicateKeyError(error: unknown): boolean {
  return (
    error !== null &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "ER_DUP_ENTRY"
  );
}
