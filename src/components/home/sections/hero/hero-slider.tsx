"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { SectionProps } from "../types";
import { normalizeHeroSlides } from "./hero.normalizers";
import HeroContent from "./hero-content";
import BottomStrip from "./bottom-strip";
import { getMediaUrl } from "@/features/media/utils/media-url";
import Image from "next/image";
import { parseHeroSettingsDefaults } from "@/features/page-sections/components/forms/hero-form";

// ─── Image focal-point constant ────────────────────────────────────────────────
// Default object-position for CMS-uploaded hero images.
// When a CMS focal-point field is introduced, replace this with the slide value.
const IMAGE_OBJECT_POSITION = "75% center";

// ─── Grain texture SVG (shared between both modes) ────────────────────────────
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ─── Premium CSS-mode background ──────────────────────────────────────────────
// Rendered when no CMS image is provided.
// Uses strong, intentional light sources and a structural diagonal gradient
// so the background has real visual character — not a flat dark rectangle.
function CSSBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">

      {/* Layer 1 — Deep base: rich Webmatic brand navy */}
      <div
        className="absolute inset-0"
        style={{ background: "#080f2e" }}
      />

      {/* Layer 2 — Diagonal sweep: gives the background a strong directional energy */}
      {/* This is the primary structural gradient — clearly visible and intentional */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(8,15,46,1) 0%, rgba(10,20,60,1) 35%, rgba(6,18,52,0.9) 60%, rgba(3,10,35,1) 100%)",
        }}
      />

      {/* Layer 3 — Primary brand light: large orange-warm glow, top-right */}
      {/* Clearly visible at 28% opacity — reads as a deliberate light source */}
      <div
        className="absolute max-sm:!animate-none max-sm:!filter-none"
        style={{
          top: "-15%",
          right: "-5%",
          width: "65%",
          height: "80%",
          background:
            "radial-gradient(ellipse at 65% 25%, rgba(249,115,22,0.28) 0%, rgba(249,115,22,0.12) 35%, transparent 68%)",
          filter: "blur(48px)",
          animation: "hero-ambient 10s ease-in-out infinite",
        }}
      />

      {/* Layer 4 — Secondary cool depth: Webmatic blue, bottom-center */}
      {/* Creates visual depth and balances the warm top-right source */}
      <div
        className="absolute"
        style={{
          bottom: "-20%",
          left: "10%",
          width: "70%",
          height: "65%",
          background:
            "radial-gradient(ellipse at 40% 80%, rgba(10,152,212,0.20) 0%, rgba(10,152,212,0.07) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Layer 5 — Dot grid: structural, adds depth without looking like SaaS noise */}
      {/* Very low opacity — reinforces depth, does not compete with content */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Layer 6 — Horizontal brand accent line: top of the hero area */}
      {/* A 1px structural line that anchors the space — deliberately design-led */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(249,115,22,0.5) 20%, rgba(10,152,212,0.4) 60%, transparent 100%)",
        }}
      />

      {/* Layer 7 — Fine grain texture: material depth */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none hidden sm:block"
        style={{ backgroundImage: GRAIN_SVG }}
      />
    </div>
  );
}


// ─── Image-mode background ─────────────────────────────────────────────────────
// Renders the CMS image as the primary visual artwork.
// The directional gradient protects the left content area while preserving
// the right-side subject. On mobile a bottom-up gradient is layered instead.
function ImageBackground({
  backgroundUrl,
  altText,
  slideKey,
  reducedMotion,
}: {
  backgroundUrl: string;
  altText: string;
  slideKey: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      key={`bg-${slideKey}`}
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute inset-0 z-0"
    >
      <Image
        src={backgroundUrl}
        fill
        // object-position is centralised at IMAGE_OBJECT_POSITION.
        // Replace with a CMS focal-point value when that field is introduced.
        className="object-cover"
        style={{ objectPosition: IMAGE_OBJECT_POSITION }}
        alt={altText}
        priority
        sizes="100vw"
      />

      {/*
        Desktop: left-to-right directional gradient.
        Strongly protects the text area on the left, fades cleanly to the right
        so the image subject remains visible and art-directed.
        Does NOT apply a blanket dark layer over the full image.
      */}
      <div
        className="absolute inset-0 hidden sm:block pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(8,15,46,0.96) 0%, rgba(8,15,46,0.82) 30%, rgba(8,15,46,0.52) 52%, rgba(8,15,46,0.18) 72%, transparent 100%)",
        }}
      />

      {/*
        Mobile: bottom-to-top gradient.
        The image sits above the text on small screens so we protect the
        content zone with a vertical gradient rather than a horizontal one.
      */}
      <div
        className="absolute inset-0 sm:hidden pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(8,15,46,0.97) 0%, rgba(8,15,46,0.88) 40%, rgba(8,15,46,0.55) 65%, rgba(8,15,46,0.2) 85%, transparent 100%)",
        }}
      />

      {/* Fine grain texture — keeps both modes visually consistent */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none hidden sm:block"
        style={{ backgroundImage: GRAIN_SVG }}
      />
    </motion.div>
  );
}

// ─── HeroSlider ────────────────────────────────────────────────────────────────

export function HeroSlider({ content, settings }: SectionProps) {
  const slides = useMemo(() => normalizeHeroSlides(content), [content]);
  const parsedSettings = useMemo(
    () => parseHeroSettingsDefaults(settings as Record<string, unknown>),
    [settings],
  );
  const shouldReduceMotion = useReducedMotion() ?? false;

  const [current, setCurrent] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [highest, setHighest] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  const goTo = useCallback(
    (index: number) => {
      if (animating || slides.length === 0) return;
      let next = index;

      if (next >= slides.length || next < 0) {
        if (!parsedSettings.loop) return;
        next = (index + slides.length) % slides.length;
      }

      setDirection(next > current ? 1 : -1);
      setAnimating(true);
      setCurrent(next);
      setHighest((h) => Math.max(h, next));
      setTimeout(() => setAnimating(false), 800);
    },
    [animating, slides.length, parsedSettings.loop, current],
  );

  const goPrev = () => goTo(current - 1);
  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);

  /* Auto-play */
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

  // Content transition variants — tuned for premium editorial feel
  const slideVariants = shouldReduceMotion
    ? {
        enter: { opacity: 1 },
        center: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        enter: () => ({
          opacity: 0,
          y: 20,
        }),
        center: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        },
        exit: () => ({
          opacity: 0,
          y: -12,
          transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        }),
      };

  return (
    <section
      className="relative -mt-26 overflow-hidden bg-hero-navy flex flex-col"
      aria-label="Hero"
    >
      {/* ── Background layer ── */}
      <AnimatePresence mode="popLayout">
        {backgroundUrl ? (
          <ImageBackground
            key={`bg-img-${current}`}
            backgroundUrl={backgroundUrl}
            altText={slide.backgroundImage?.altText ?? ""}
            slideKey={current}
            reducedMotion={shouldReduceMotion}
          />
        ) : (
          // CSS-mode: single stable instance, no crossfade needed
          <CSSBackground key="bg-css" />
        )}
      </AnimatePresence>

      {/* ── Content layer ── */}
      <div className="z-10 relative flex flex-col">
        {/* Hero content area — controlled height */}
        <div className="min-h-[600px] sm:min-h-[640px] md:min-h-[680px] flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex-1 flex flex-col"
            >
              <HeroContent slide={slide} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom navigation strip — anchored below content */}
        {parsedSettings.showNavigation && slides.length > 1 && (
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
