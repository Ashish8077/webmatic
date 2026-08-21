export const USERS_QUERY_KEYS = {
  ALL: ["users"] as const,
  LIST: (params?: Record<string, unknown>) =>
    [...USERS_QUERY_KEYS.ALL, "list", params] as const,
  DETAIL: (id: number) => [...USERS_QUERY_KEYS.ALL, "detail", id] as const,
};
