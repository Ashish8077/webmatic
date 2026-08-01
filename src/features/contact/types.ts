import { z } from "zod";
import { contactFormSchema } from "./schemas";

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface SubmitContactPayload extends ContactFormData {
  recaptchaToken: string;
}

export interface SubmitContactResponse {
  success: boolean;
  message?: string;
}
