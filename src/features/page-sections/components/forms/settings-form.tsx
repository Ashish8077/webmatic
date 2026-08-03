import { SelectField } from "../fields";

export function SettingsForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <SelectField
        name="settings.container"
        label="Container Width"
        disabled={disabled}
        options={[
          { label: "Default (Max Width 7xl)", value: "default" },
          { label: "Full Width (Max Width 1400px)", value: "full" },
        ]}
      />
      <SelectField
        name="settings.background"
        label="Background Color"
        disabled={disabled}
        options={[
          { label: "White", value: "white" },
          { label: "Slate/Gray", value: "slate" },
          { label: "Green/Primary", value: "green" },
        ]}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <SelectField
          name="settings.paddingTop"
          label="Padding Top"
          disabled={disabled}
          options={[
            { label: "None", value: "none" },
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" },
          ]}
        />
        <SelectField
          name="settings.paddingBottom"
          label="Padding Bottom"
          disabled={disabled}
          options={[
            { label: "None", value: "none" },
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" },
          ]}
        />
      </div>
    </div>
  );
}
