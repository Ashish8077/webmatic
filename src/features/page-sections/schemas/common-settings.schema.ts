import { z } from "zod";

export const booleanSetting = z.boolean().default(false);

export const numberSetting = (min = 0, max = 100000) =>
  z
    .number()
    .int("Must be an integer")
    .min(min, `Minimum is ${min}`)
    .max(max, `Maximum is ${max}`);

export const sliderSettingsSchema = z.object({
  autoplay: booleanSetting.default(true),
  autoplayDelay: numberSetting(1000, 20000).default(5000),
  loop: booleanSetting.default(true),
  showNavigation: booleanSetting.default(true),
  showPagination: booleanSetting.default(true),
});

export type SliderSettings = z.infer<typeof sliderSettingsSchema>;

export const DEFAULT_SLIDER_SETTINGS: SliderSettings = {
  autoplay: true,
  autoplayDelay: 5000,
  loop: true,
  showNavigation: true,
  showPagination: true,
};

// Keep slider parsing reusable because Hero and Testimonials share identical behavior.
// This prevents duplication and ensures new slider settings are parsed identically across all sections.
export function parseSliderSettingsDefaults(
  settings: Record<string, unknown> | undefined | null,
): SliderSettings {
  const raw = (settings ?? {}) as Partial<SliderSettings>;
  return {
    autoplay: raw.autoplay ?? DEFAULT_SLIDER_SETTINGS.autoplay,
    autoplayDelay: raw.autoplayDelay ?? DEFAULT_SLIDER_SETTINGS.autoplayDelay,
    loop: raw.loop ?? DEFAULT_SLIDER_SETTINGS.loop,
    showNavigation: raw.showNavigation ?? DEFAULT_SLIDER_SETTINGS.showNavigation,
    showPagination: raw.showPagination ?? DEFAULT_SLIDER_SETTINGS.showPagination,
  };
}
