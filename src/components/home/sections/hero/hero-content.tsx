"use client";

import { ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { SlideType } from "./hero.types";

// ─── Animation variants ────────────────────────────────────────────────────────

function buildVariants(reducedMotion: boolean) {
  const fadeUp = reducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        },
      };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.14,
        delayChildren: reducedMotion ? 0 : 0.05,
      },
    },
  };

  return { fadeUp, stagger };
}

// ─── HeroContent ──────────────────────────────────────────────────────────────

const HeroContent = ({ slide }: { slide: SlideType }) => {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { fadeUp, stagger } = buildVariants(shouldReduceMotion);

  return (
    <motion.div
      className="relative z-10 flex flex-1 flex-col items-start justify-center px-6 sm:px-12 lg:px-20 pt-40 pb-12 max-w-360 mx-auto w-full"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Eyebrow badge */}
      <motion.div
        variants={fadeUp}
        className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/6 backdrop-blur-sm px-4 py-2 text-[11px] font-bold tracking-[0.13em] uppercase text-white/75 shadow-sm"
      >
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-400" />
        </span>
        <span className="max-w-48 sm:max-w-none truncate sm:whitespace-normal">
          {slide.label}
        </span>
      </motion.div>

      {/* Primary headline */}
      {/* max-w-[720px] keeps the line length editorial — 2–3 words per line at large size */}
      <motion.h1
        variants={fadeUp}
        className="mt-6 max-w-180 text-[34px] sm:text-[46px] md:text-[56px] lg:text-[64px] font-extrabold leading-[1.06] tracking-[-0.02em] text-white"
      >
        {slide.heading}{" "}
        <span className="text-orange-400">{slide.highlight}</span>
      </motion.h1>

      {/* Supporting description */}
      {/* max-w-lg prevents the description from becoming an unreadable full-width block */}
      <motion.p
        variants={fadeUp}
        className="mt-5 max-w-lg text-[15px] sm:text-[16px] leading-[1.75] text-white/55"
      >
        {slide.subheadline}
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        variants={fadeUp}
        className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
      >
        {/* Primary — solid orange, high-contrast */}
        <Link
          href={slide.primaryButton.to}
          className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-[14px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-250 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-px active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hero-navy"
        >
          {slide.primaryButton.text}
          <ChevronRight
            size={15}
            className="transition-transform duration-250 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>

        {/* Secondary — refined outline, no heavy glass morphism */}
        <Link
          href={slide.secondaryButton.to}
          className="group inline-flex items-center justify-center gap-2 rounded-lg border border-white/18 bg-transparent px-8 py-3.5 text-[14px] font-bold text-white/80 transition-all duration-250 hover:bg-white/8 hover:border-white/28 hover:text-white hover:-translate-y-px active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-hero-navy"
        >
          {slide.secondaryButton.text}
          <ArrowRight
            size={14}
            className="opacity-45 transition-all duration-250 group-hover:opacity-100 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
