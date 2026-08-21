export const SERVICES_QUERY_KEYS = {
  ALL: ["workProjects"] as const,
  LIST: (params: Record<string, unknown>) => [...SERVICES_QUERY_KEYS.ALL, "list", params] as const,
  DETAIL: (id: number) => [...SERVICES_QUERY_KEYS.ALL, "detail", id] as const,
} as const;
