/**
 * The strict union type of all valid page template values.
 * This is used for backend validation to ensure only these templates can be saved.
 */
export const PAGE_TEMPLATE_VALUES = ["home", "default", "landing"] as const;

/**
 * Array of objects mapping template values to user-friendly labels.
 * Used in the admin panel frontend to render the template dropdown.
 */
export const PAGE_TEMPLATES = [
  { label: "Home Page", value: "home" },
  { label: "Default (Header & Footer)", value: "default" },
  { label: "Landing Page (No Header/Footer)", value: "landing" },
] as const;
