export const SERVICES_ENDPOINTS = {
  CREATE_SERVICE: "/services",
  GET_SERVICES: "/services",
  GET_SERVICE_BY_ID: (id: number) => `/services/${id}`,
  UPDATE_SERVICE: (id: number) => `/services/${id}`,
  DELETE_SERVICE: (id: number) => `/services/${id}`,
} as const;
