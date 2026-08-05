import { z } from "zod";

export const blogListContentSchema = z.object({
  heading: z.string().optional(),
  subheading: z.string().optional(),
  postsPerPage: z.coerce.number().int().positive().catch(9),
});

export type BlogListContent = z.infer<typeof blogListContentSchema>;

export const blogListSettingsSchema = z.object({
  isVisible: z.boolean().default(true),
});

export type BlogListSettings = z.infer<typeof blogListSettingsSchema>;

export function parseBlogListContentDefaults(
  content: unknown
): BlogListContent {
  if (!content || typeof content !== "object") {
    return {
      heading: "",
      subheading: "",
      postsPerPage: 9,
    };
  }
  
  const parsed = blogListContentSchema.safeParse(content);
  if (parsed.success) {
    return parsed.data;
  }
  
  const typedContent = content as Partial<BlogListContent>;
  const parsedPosts = Number(typedContent.postsPerPage);

  return {
    heading: typedContent.heading ?? "",
    subheading: typedContent.subheading ?? "",
    postsPerPage: !isNaN(parsedPosts) && parsedPosts > 0 ? parsedPosts : 9,
  };
}

export function parseBlogListSettingsDefaults(
  settings: unknown
): BlogListSettings {
  if (!settings || typeof settings !== "object") {
    return { isVisible: true };
  }
  
  const parsed = blogListSettingsSchema.safeParse(settings);
  if (parsed.success) {
    return parsed.data;
  }
  
  const typedSettings = settings as Partial<BlogListSettings>;
  return {
    isVisible: typedSettings.isVisible ?? true,
  };
}
