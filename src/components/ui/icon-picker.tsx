import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "./input";
import { getIconComponent, iconNames } from "./icon-registry";
import clsx from "clsx";

interface IconPickerProps {
  value: string | null;
  onChange: (value: string | null) => void;
  className?: string;
}

export function IconPicker({ value, onChange, className }: IconPickerProps) {
  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(() => {
    if (!search.trim()) {
      return iconNames.slice(0, 100);
    }
    const lowerSearch = search.toLowerCase();
    return iconNames
      .filter((name) => name.toLowerCase().includes(lowerSearch))
      .slice(0, 100);
  }, [search]);

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 border rounded-md p-4 bg-background",
        className,
      )}
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 overflow-y-auto max-h-60 p-1">
        {filteredIcons.map((iconName) => {
          const Icon = getIconComponent(iconName);
          if (!Icon) return null;

          const isSelected = value === iconName;

          return (
            <button
              key={iconName}
              type="button"
              onClick={() => onChange(iconName)}
              title={iconName}
              className={clsx(
                "flex items-center justify-center p-2 rounded-md hover:bg-muted transition-colors aspect-square",
                isSelected
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-transparent text-foreground",
              )}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>

      {filteredIcons.length === 0 && (
        <div className="text-center py-4 text-muted-foreground text-sm">
          No icons found matching "{search}"
        </div>
      )}
    </div>
  );
}
