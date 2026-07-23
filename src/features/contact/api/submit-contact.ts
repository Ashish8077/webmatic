import type { ContactFormData, SubmitContactResponse } from "../types";

export const submitContact = async (
  _payload: ContactFormData
): Promise<SubmitContactResponse> => {
  // TODO: Uncomment when Contact Module API is available.
  // return api.post("/contact", payload);

  return { success: true };
};
