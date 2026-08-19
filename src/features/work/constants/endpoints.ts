export const SERVICES_ENDPOINTS = {
  CREATE_SERVICE: "/work/projects",
  GET_SERVICES: "/work/projects",
  GET_SERVICE_BY_ID: (id: number) => `/work/projects/${id}`,
  UPDATE_SERVICE: (id: number) => `/work/projects/${id}`,
  DELETE_SERVICE: (id: number) => `/work/projects/${id}`,
} as const;
