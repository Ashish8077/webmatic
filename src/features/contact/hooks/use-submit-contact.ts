import { useMutation } from "@tanstack/react-query";
import { submitContact, ContactAppError } from "../services/submit-contact.service";
import type { SubmitContactPayload, SubmitContactResponse } from "../types";

export const useSubmitContact = () => {
  return useMutation<SubmitContactResponse, ContactAppError, SubmitContactPayload>({
    mutationFn: submitContact,
    retry: 0,
  });
};
