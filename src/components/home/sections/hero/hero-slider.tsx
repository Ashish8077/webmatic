"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { SectionProps } from "../types";
import { normaliseHeroSlides } from "./hero.normalizers";
import BackgroundRings from "./background-rings";
import DecorativeShapes from "./decorative-shapes";
import SlideCounter from "./slide-counter";
import HeroContent from "./hero-content";
import BottomStrip from "./bottom-strip";
import { getMediaUrl } from "@/features/media/utils/media-url";
import Image from "next/image";
import { parseHeroSettingsDefaults } from "@/features/page-sections/components/forms/hero-form";

export function HeroSlider({ content, settings }: SectionProps) {
  const slides = useMemo(() => normaliseHeroSlides(content), [content]);
  const parsedSettings = useMemo(
    () => parseHeroSettingsDefaults(settings as Record<string, unknown>),
    [settings],
  );

  const [current, setCurrent] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [highest, setHighest] = useState<number>(0);

  const goTo = useCallback(
    (index: number) => {
      if (animating || slides.length === 0) return;
      let next = index;

      if (next >= slides.length || next < 0) {
        if (!parsedSettings.loop) return; // Do nothing if loop is disabled
        next = (index + slides.length) % slides.length;
      }

      setAnimating(true);
      setCurrent(next);
      setHighest((h) => Math.max(h, next));
      setTimeout(() => setAnimating(false), 500);
    },
    [animating, slides.length, parsedSettings.loop],
  );

  const goPrev = () => goTo(current - 1);
  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);

  /* Auto-play — only pauses when mouse is over the strip, respects setting */
  useEffect(() => {
    if (paused || !parsedSettings.autoplay) return;
    const timer = setInterval(goNext, parsedSettings.autoplayDelay);
    return () => clearInterval(timer);
  }, [goNext, paused, parsedSettings.autoplay, parsedSettings.autoplayDelay]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo]);

  if (slides.length === 0) return null;

  const slide = slides[current];
  const backgroundUrl = getMediaUrl(slide.backgroundImage);

  console.log(parsedSettings.showPagination);

  return (
    <section className="relative h-[calc(100vh-104px)] min-h-[500px] overflow-hidden bg-gradient-to-b from-[#f3f4f8] to-[#c7eef0] flex flex-col">
      {backgroundUrl && (
        <Image src={backgroundUrl} fill className="object-cover absolute inset-0 z-0" alt={slide.backgroundImage?.altText ?? ""} />
      )}
      <div className="z-10 relative flex flex-col h-full">
        <BackgroundRings />
        <DecorativeShapes current={current} slides={slides} />

        {parsedSettings.showPagination && (
          <SlideCounter current={current} slides={slides} />
        )}

        <HeroContent slide={slide} />

      {/* If showNavigation is toggled off, we could hide the bottom strip entirely or modify it. 
          Assuming BottomStrip houses the navigation arrows. */}
      {parsedSettings.showNavigation && (
        <BottomStrip
          current={current}
          goTo={goTo}
          setPaused={setPaused}
          paused={paused}
          highest={highest}
          AUTOPLAY_DELAY={parsedSettings.autoplayDelay}
          slides={slides}
          goNext={goNext}
          goPrev={goPrev}
          showPagination={parsedSettings.showPagination}
        />
      )}
      </div>
    </section>
  );
}
