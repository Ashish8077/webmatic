import type { ComponentType } from "react";
import type { JsonObject } from "@/shared/types/json";

/**
 * Props contract that every section field component must accept.
 */
export interface SectionFieldComponentProps {
  disabled?: boolean;
}

/** A React component that renders fields for content or settings. */
export type SectionFieldComponent = ComponentType<SectionFieldComponentProps>;

/** A function that parses raw JSON from the DB into strictly typed form values. */
export type ParseDefaultsFn<T> = (data: JsonObject | undefined | null) => T;
