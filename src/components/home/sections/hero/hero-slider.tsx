"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { SectionProps } from "../types";
import { AUTOPLAY_DELAY } from "./hero.constants";
import { normaliseHeroSlides } from "./hero.normalizers";
import BackgroundRings from "./background-rings";
import DecorativeShapes from "./decorative-shapes";
import SlideCounter from "./slide-counter";
import HeroContent from "./hero-content";
import BottomStrip from "./bottom-strip";

export function HeroSlider({ content }: SectionProps) {
  const slides = useMemo(() => normaliseHeroSlides(content), [content]);

  const [current, setCurrent] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [highest, setHighest] = useState<number>(0);

  const goTo = useCallback(
    (index: number) => {
      if (animating || slides.length === 0) return;
      const next = (index + slides.length) % slides.length;
      setAnimating(true);
      setCurrent(next);
      setHighest((h) => Math.max(h, next));
      setTimeout(() => setAnimating(false), 500);
    },
    [animating, slides.length],
  );

  const goPrev = () => goTo(current - 1);
  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);

  /* Auto-play — only pauses when mouse is over the strip */
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(goNext, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [goNext, paused]);

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

  return (
    <section className="relative h-[calc(100vh-88px)] min-h-[500px] overflow-hidden bg-gradient-to-b from-[#f3f4f8] to-[#c7eef0] flex flex-col">
      <BackgroundRings />
      <DecorativeShapes current={current} slides={slides} />
      <SlideCounter current={current} slides={slides} />
      <HeroContent slide={slide} />
      <BottomStrip
        current={current}
        goTo={goTo}
        setPaused={setPaused}
        paused={paused}
        highest={highest}
        AUTOPLAY_DELAY={AUTOPLAY_DELAY}
        slides={slides}
        goNext={goNext}
        goPrev={goPrev}
      />
    </section>
  );
}
