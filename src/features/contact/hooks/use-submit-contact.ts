import { useMutation } from "@tanstack/react-query";
import { submitContact } from "../api/submit-contact";
import type { ContactFormData, SubmitContactResponse } from "../types";

export const useSubmitContact = () => {
  return useMutation<SubmitContactResponse, Error, ContactFormData>({
    mutationFn: submitContact,
  });
};
