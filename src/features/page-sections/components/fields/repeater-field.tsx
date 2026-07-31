"use client";

import type { ReactNode } from "react";
import {
  useFieldArray,
  useFormContext,
  type FieldValues,
  type ArrayPath,
  type FieldArray,
} from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RepeaterFieldProps<T extends FieldValues> {
  /** The array field path, e.g. "slides" or "items" */
  name: ArrayPath<T>;
  label: string;
  /** Default values for a newly appended item */
  defaultItem: FieldArray<T, ArrayPath<T>>;
  /** Render function for each item — receives the index */
  renderItem: (index: number) => ReactNode;
  /** Maximum number of items allowed */
  max?: number;
  disabled?: boolean;
}

/**
 * Generic repeater field wrapping `useFieldArray`.
 * Handles add / remove and renders items via a render prop.
 */
export function RepeaterField<T extends FieldValues>({
  name,
  label,
  defaultItem,
  renderItem,
  max,
  disabled,
}: RepeaterFieldProps<T>) {
  const { control, formState } = useFormContext<T>();
  const { fields, append, remove } = useFieldArray({ control, name });

  const canAdd = max === undefined || fields.length < max;
  
  // Extract array-level error (e.g. from `.max(3)`)
  const arrayError = name.split(".").reduce((acc: any, part) => acc?.[part], formState.errors);
  const errorMessage = arrayError?.message as string | undefined;

  return (
    <fieldset className="space-y-3">
      <div className="flex items-center justify-between">
        <legend className="text-sm font-medium text-foreground">
          {label} ({fields.length})
        </legend>
        {canAdd && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled}
            onClick={() => append(defaultItem)}
          >
            <Plus size={14} />
            Add
          </Button>
        )}
      </div>
      
      {errorMessage && (
        <p className="text-sm font-medium text-destructive">{errorMessage}</p>
      )}

      {fields.length === 0 && (
        <p className="py-4 text-center text-sm text-muted-foreground">
          No {label.toLowerCase()} added yet.
        </p>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="relative rounded-lg border border-card-border bg-surface p-4 space-y-3"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">
              #{index + 1}
            </span>
            <button
              type="button"
              disabled={disabled}
              onClick={() => remove(index)}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-danger/10 hover:text-danger disabled:cursor-not-allowed disabled:opacity-50"
              title="Remove"
            >
              <Trash2 size={14} />
            </button>
          </div>
          {renderItem(index)}
        </div>
      ))}
    </fieldset>
  );
}
