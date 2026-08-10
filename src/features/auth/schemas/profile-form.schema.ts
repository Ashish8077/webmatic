import { z } from "zod";

export const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required." })
    .max(100, { message: "First name must not exceed 100 characters." }),
 lastName: z
  .string()
  .max(100, { message: "Last name must not exceed 100 characters." })
  .optional(),
  profileImageId: z
    .number()
    .nullable()
    .optional(),
  // For the UI MediaField to keep track of the selected Media object
  profileImage: z.any().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
