import { z } from "zod";

export const companyOverviewContentSchema = z.object({
  badge: z.string().min(1, "Badge text is required"),
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
  primaryButton: z
    .object({
      text: z.string().min(1, "Button text is required"),
      url: z.string().min(1, "Button URL is required"),
    })
    .optional(),
  bottomText: z
    .object({
      supportingText: z.string().min(1, "Supporting text is required"),
      linkText: z.string().min(1, "Link text is required"),
      linkUrl: z.string().min(1, "Link URL is required"),
    })
    .optional(),
});

export type CompanyOverviewContentValues = z.infer<
  typeof companyOverviewContentSchema
>;

export const DEFAULT_COMPANY_OVERVIEW_CONTENT: CompanyOverviewContentValues = {
  badge: "GET TO KNOW US BETTER",
  heading: "Driven by a Passion to Bring New Ideas to Life",
  description: "",
  primaryButton: {
    text: "Speak With An Expert",
    url: "/contact",
  },
  bottomText: {
    supportingText: "We Serve our Clients' Best Interests with the Best Marketing Solutions.",
    linkText: "Find Out More",
    linkUrl: "/services",
  },
};
