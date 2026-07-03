import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export function applyServerErrors<T extends FieldValues>(
  form: UseFormReturn<T>,
  errors?: Record<string, string[]>,
) {
  if (!errors) return;

  Object.entries(errors).forEach(([field, messages]) => {
    form.setError(field as Path<T>, {
      type: "server",
      message: messages[0],
    });
  });
}
