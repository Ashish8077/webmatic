import { apiClient } from "@/lib/api/client";
import { isAxiosError } from "axios";
import type { SubmitContactPayload, SubmitContactResponse } from "../types";

export class ContactAppError extends Error {
  constructor(
    message: string,
    public readonly code: "RATE_LIMIT" | "FORBIDDEN" | "VALIDATION" | "UNEXPECTED"
  ) {
    super(message);
    this.name = "ContactAppError";
  }
}

export const submitContact = async (
  payload: SubmitContactPayload
): Promise<SubmitContactResponse> => {
  try {
    const { data } = await apiClient.post<SubmitContactResponse>("/contact", payload);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      
      if (status === 429) {
        throw new ContactAppError("Rate limit exceeded", "RATE_LIMIT");
      }
      
      if (status === 403) {
        throw new ContactAppError("Security verification failed", "FORBIDDEN");
      }

      if (status === 400) {
        throw new ContactAppError("Validation failed", "VALIDATION");
      }
    }
    
    throw new ContactAppError("An unexpected error occurred", "UNEXPECTED");
  }
};
