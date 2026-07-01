import { FieldValues, Path, UseFormSetError } from "react-hook-form";

export function applyServerErrors<T extends FieldValues>(
  setError: UseFormSetError<T>,
  errors?: Partial<Record<Path<T>, string>>,
) {
  if (!errors) return;

  for (const field in errors) {
    const message = errors[field as Path<T>];

    if (!message) continue;

    setError(field as Path<T>, {
      type: "server",
      message,
    });
  }
}
