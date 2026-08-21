export const MEDIA_FOLDERS = [
  { value: "homepage", label: "Homepage" },
  { value: "services", label: "Services" },
  { value: "about", label: "About" },
  { value: "blog", label: "Blog" },
  { value: "seo", label: "SEO" },
  { value: "team", label: "Team" },
  { value: "general", label: "General" },
] as const;

export type MediaFolderValue = (typeof MEDIA_FOLDERS)[number]["value"];
