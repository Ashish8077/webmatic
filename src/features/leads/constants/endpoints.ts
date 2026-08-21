export const LEADS_ENDPOINTS = {
  GET_LEADS: "/admin/leads",
  GET_LEAD: (id: number) => `/admin/leads/${id}`,
  UPDATE_LEAD: (id: number) => `/admin/leads/${id}`,
  DELETE_LEAD: (id: number) => `/admin/leads/${id}`,
  EXPORT_LEADS: "/admin/leads/export",
} as const;
