"use client";

import { SwitchField } from "./switch-field";
import { NumberField } from "./number-field";

interface SliderSettingsFieldsProps {
  /** The parent path, typically "settings" */
  namePrefix?: string;
  disabled?: boolean;
}

export function SliderSettingsFields({
  namePrefix = "settings",
  disabled,
}: SliderSettingsFieldsProps) {
  const prefix = namePrefix ? `${namePrefix}.` : "";

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground  pb-2">
        Slider Configuration
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <SwitchField
          name={`${prefix}autoplay`}
          label="Autoplay"
          description="Automatically transition between slides"
          disabled={disabled}
        />
        <NumberField
          name={`${prefix}autoplayDelay`}
          label="Autoplay Delay (ms)"
          placeholder="e.g. 5000"
          disabled={disabled}
        />
        <SwitchField
          name={`${prefix}loop`}
          label="Infinite Loop"
          description="Restart from the beginning after the last slide"
          disabled={disabled}
        />
        <SwitchField
          name={`${prefix}showNavigation`}
          label="Show Navigation"
          description="Display Next/Prev arrow buttons"
          disabled={disabled}
        />
        <SwitchField
          name={`${prefix}showPagination`}
          label="Show Pagination"
          description="Display dot indicators at the bottom"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
