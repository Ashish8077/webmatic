export const WORK_CATEGORIES = [
  "web-development",
  "e-commerce",
  "digital-marketing",
] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export const WORK_CATEGORY_LABELS: Record<WorkCategory, string> = {
  "web-development": "Web Development",
  "e-commerce": "E-Commerce",
  "digital-marketing": "Digital Marketing",
};
