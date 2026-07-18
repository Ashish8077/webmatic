"use client";

import { TextField } from "./text-field";
import { TextareaField } from "./textarea-field";

interface SectionHeadingFieldsProps {
  /** The parent path, typically "content" */
  namePrefix?: string;
  /** Whether to render the description field. Defaults to false. */
  showDescription?: boolean;
  disabled?: boolean;
}

/**
 * Renders badge + heading + highlight (and optional description) fields.
 * Used by most section forms that share this common header pattern.
 */
export function SectionHeadingFields({
  namePrefix,
  showDescription = false,
  disabled,
}: SectionHeadingFieldsProps) {
  const prefix = namePrefix ? `${namePrefix}.` : "";

  return (
    <div className="space-y-3">
      <TextField
        name={`${prefix}badge`}
        label="Badge"
        placeholder="e.g. Our Services"
        disabled={disabled}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          name={`${prefix}heading`}
          label="Heading"
          placeholder="Section heading"
          disabled={disabled}
        />
        <TextField
          name={`${prefix}highlight`}
          label="Highlight"
          placeholder="Highlighted text"
          disabled={disabled}
        />
      </div>
      {showDescription && (
        <TextareaField
          name={`${prefix}description`}
          label="Description"
          placeholder="Section description"
          disabled={disabled}
        />
      )}
    </div>
  );
}
