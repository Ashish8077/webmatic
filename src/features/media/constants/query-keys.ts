import { MediaQuery } from "../types/media-query.types";

export const mediaKeys = {
  all: ["media"] as const,
  lists: () => [...mediaKeys.all, "list"] as const,
  list: (params: MediaQuery) => [...mediaKeys.lists(), params] as const,
  detail: (id: number) => [...mediaKeys.all, id] as const,
};
