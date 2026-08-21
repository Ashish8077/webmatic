export const SERVICE_STATUS = ["draft", "published"] as const;
export type ServiceStatus = (typeof SERVICE_STATUS)[number];
