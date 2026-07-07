import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export function applyServerErrors<T extends FieldValues>(
  form: UseFormReturn<T>,
  errors?: Partial<Record<Path<T>, string[]>>,
) {
  if (!errors) return;

  for (const field in errors) {
    const message = errors[field as Path<T>];

    if (!message || !message.length) continue;

    form.setError(field as Path<T>, {
      type: "server",
      message: message[0],
    });
  }
}
