import { HeroSlider } from "./hero-slider";
import type { SectionProps } from "../types";

export function HeroSection({ content, settings }: SectionProps) {
  return <HeroSlider content={content} settings={settings} />;
}
