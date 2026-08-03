export const LEAD_STATUS = {
  NEW: "new",
  IN_PROGRESS: "in_progress",
  CONTACTED: "contacted",
  CLOSED: "closed",
  SPAM: "spam",
} as const;

export type LeadStatus = (typeof LEAD_STATUS)[keyof typeof LEAD_STATUS];

export const LEAD_SORT_COLUMNS = [
  "created_at",
  "updated_at",
  "name",
  "email",
  "status",
] as const;
