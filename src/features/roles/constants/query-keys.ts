export const ROLES_QUERY_KEYS = {
  ALL: ["roles"] as const,
  LIST: () => [...ROLES_QUERY_KEYS.ALL, "list"] as const,
};
