import { z } from "zod";

export const coreValuesItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  iconId: z.number().nullable().optional(),
  linkText: z.string().min(1, "Link text is required"),
  linkUrl: z.string().min(1, "Link URL is required"),
});

export const coreValuesContentSchema = z.object({
  badge: z.string().min(1, "Badge text is required"),
  heading: z.string().min(1, "Heading is required"),
  values: z.array(coreValuesItemSchema).min(1, "At least one core value is required"),
});

export type CoreValuesContentValues = z.infer<typeof coreValuesContentSchema>;
export type CoreValuesItemValues = z.infer<typeof coreValuesItemSchema>;

export const DEFAULT_CORE_VALUES_CONTENT: CoreValuesContentValues = {
  badge: "CORE VALUES",
  heading: "3 Reasons Why Webmatic Technology is Your Ideal Digital Marketing Partner",
  values: [
    {
      title: "Customers First",
      description: "Webmatic Technology starts by fully understanding your business objectives. Every strategy we create is designed with your goals at the forefront, ensuring we drive the results that matter most to you.",
      iconId: null,
      linkText: "Find Out More",
      linkUrl: "/about"
    },
    {
      title: "Exceptional Team",
      description: "Our talented in-house team combines agency expertise with enterprise-level knowledge. We offer various backgrounds and expertise to deliver unique digital marketing solutions.",
      iconId: null,
      linkText: "Meet The Team",
      linkUrl: "/team"
    },
    {
      title: "Reliable Support",
      description: "We make communication easy. Our support team is always accessible, and our average response time is incredibly fast—ensuring you get the help you need when you need it.",
      iconId: null,
      linkText: "Talk to Customer Support",
      linkUrl: "/contact"
    }
  ],
};
