"use client";

import { TextField } from "./text-field";

interface ButtonFieldsProps {
  /** The parent path, e.g. "primaryButton" or "slides.0.primaryButton" */
  name: string;
  label: string;
  disabled?: boolean;
}

/**
 * Renders text + url inputs side by side for a CMS button object.
 * Expects the parent form values at `name` to be `{ text: string, url: string }`.
 */
export function ButtonFields({ name, label, disabled }: ButtonFieldsProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-foreground">{label}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          name={`${name}.text`}
          label="Text"
          placeholder="Button text"
          disabled={disabled}
        />
        <TextField
          name={`${name}.url`}
          label="URL"
          placeholder="/page or https://..."
          disabled={disabled}
        />
      </div>
    </fieldset>
  );
}
