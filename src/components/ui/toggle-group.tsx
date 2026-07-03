"use client";

interface ToggleOption<T extends string> {
  label: string;
  value: T;
}

interface ToggleGroupProps<T extends string> {
  label?: string;
  value: T;
  onChange: (value: T) => void;
  options: ToggleOption<T>[];
  error?: string;
}

export function ToggleGroup<T extends string>({
  label,
  value,
  onChange,
  options,
  error,
}: ToggleGroupProps<T>) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div className="flex gap-2">
        {options.map((option) => {
          const active = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:bg-muted"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-danger mt-0.5">{error}</p>}
    </div>
  );
}
