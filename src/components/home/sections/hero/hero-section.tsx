import { HeroSlider } from "./hero-slider";
import type { SectionProps } from "../types";

export function HeroSection({ content }: SectionProps) {
  return <HeroSlider content={content} />;
}
