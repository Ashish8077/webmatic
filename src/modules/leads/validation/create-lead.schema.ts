import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(255),
  
  email: z.string().trim().toLowerCase().email("Invalid email address").max(255),
  
  phone: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === "" ? undefined : val))
    .refine(
      (val) => !val || /^[+\d\s\-\(\)]+$/.test(val),
      "Invalid phone number format"
    ),
    
  company: z
    .string()
    .trim()
    .max(255)
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
    
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
    
  recaptchaToken: z.string().min(1, "reCAPTCHA verification is required"),
});

export type CreateLeadSchemaData = z.infer<typeof createLeadSchema>;
