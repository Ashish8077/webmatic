"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { TestimonialItem } from "@/modules/testimonials/types/service.types";
import { parseSliderSettingsDefaults } from "@/features/page-sections/schemas/common-settings.schema";

interface TestimonialsSliderProps {
  items: TestimonialItem[];
  settings?: Record<string, unknown> | null;
}

export function TestimonialsSlider({ items, settings }: TestimonialsSliderProps) {
  const parsedSettings = parseSliderSettingsDefaults(settings);
  const shouldReduceMotion = useReducedMotion();

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      let nextIndex = index;
      if (nextIndex < 0 || nextIndex >= items.length) {
        if (!parsedSettings.loop) return;
        nextIndex = (index + items.length) % items.length;
      }
      
      setDirection(nextIndex > current ? 1 : -1);
      setCurrent(nextIndex);
    },
    [items.length, parsedSettings.loop, current],
  );

  const prev = () => goTo(current - 1);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (paused || items.length === 0 || !parsedSettings.autoplay) return;
    const timer = setInterval(next, parsedSettings.autoplayDelay || 6000);
    return () => clearInterval(timer);
  }, [next, paused, items.length, parsedSettings.autoplay, parsedSettings.autoplayDelay]);

  if (items.length === 0) return null;

  const t = items[current];

  // Variants for the card slider
  const cardVariants = shouldReduceMotion
    ? {
        enter: { opacity: 1 },
        center: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        enter: (dir: number) => ({
          opacity: 0,
          scale: 0.95,
          x: dir > 0 ? 80 : -80,
        }),
        center: {
          opacity: 1,
          scale: 1,
          x: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
          },
        },
        exit: (dir: number) => ({
          opacity: 0,
          scale: 0.95,
          x: dir > 0 ? -80 : 80,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
          },
        }),
      };

  // Staggered variants for the stars
  const starContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.05 },
    },
  };

  const starVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { type: "spring" as const, stiffness: 400, damping: 15 },
        },
      };

  return (
    <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
      <div
        className="relative group"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Background shadow layer for depth */}
        <div className="absolute inset-0 bg-slate-200/60 rounded-[2.5rem] scale-[0.94] translate-y-6 opacity-0 group-hover:translate-y-8 group-hover:scale-[0.96] transition-all duration-500 hidden sm:block" />
        <div className="absolute inset-0 bg-slate-200/40 rounded-[2.5rem] scale-[0.97] translate-y-3 opacity-0 group-hover:translate-y-4 group-hover:scale-[0.98] transition-all duration-500 hidden sm:block" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative w-full rounded-[2.5rem] bg-linear-to-br from-white to-slate-50 border border-slate-200 p-8 sm:p-14 lg:p-16 shadow-xl shadow-slate-200/80 overflow-hidden"
          >
            {/* Watermark Quote Icon */}
            <div className="absolute -top-10 -left-6 text-[180px] font-serif leading-none text-slate-100/80 rotate-[-10deg] select-none pointer-events-none z-0">
              &ldquo;
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-10 md:gap-14 items-center md:items-start">
              
              {/* Left Column: Author Image & Details (for desktop, it can be on left or right, let's keep text on top/left, author on bottom/right) */}
              
              <div className="flex-1 w-full text-center md:text-left flex flex-col">
                <motion.div
                  variants={starContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-center md:justify-start gap-1 mb-6"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div key={i} variants={starVariants}>
                      <Star
                        size={22}
                        className={
                          t.rating > i
                            ? "text-orange-500 fill-orange-500"
                            : "text-slate-200 fill-slate-200"
                        }
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {t.title && (
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight mb-4 tracking-tight">
                    {t.title}
                  </h3>
                )}

                <p className={`text-[17px] sm:text-[20px] leading-[1.8] text-slate-600 font-medium ${!t.title ? "mt-2" : ""}`}>
                  &ldquo;{t.description}&rdquo;
                </p>

                {/* Author Info Bottom */}
                <div className="mt-10 flex items-center justify-center md:justify-start gap-4">
                  <motion.div
                    initial={shouldReduceMotion ? {} : { scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative h-16 w-16 shrink-0 rounded-full bg-slate-100 border-2 border-slate-200 shadow-md overflow-hidden flex items-center justify-center"
                  >
                    {t.profileImage && t.profileImage.url ? (
                      <Image
                        src={t.profileImage.url}
                        alt={t.clientName}
                        fill
                        className="object-cover"
                        unoptimized
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <User size={28} className="text-slate-400" />
                    )}
                  </motion.div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-navy">{t.clientName}</p>
                    {(t.designation || t.companyName) && (
                      <p className="text-sm text-slate-500 mt-0.5 font-medium">
                        {t.designation}
                        {t.designation && t.companyName && (
                          <span className="mx-2 text-slate-300">•</span>
                        )}
                        {t.companyName && (
                          <span className="text-primary">{t.companyName}</span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons (Floating safely outside or overlapping elegantly) */}
        {items.length > 1 && parsedSettings.showNavigation && (
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between px-2 sm:-mx-6 lg:-mx-12 pointer-events-none z-20 hidden sm:flex">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary shadow-lg shadow-primary/5 hover:bg-primary hover:text-white hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 transition-all duration-300"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-hover hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 transition-all duration-300"
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Navigation & Dots */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
        {/* Mobile Arrows (Visible only on mobile) */}
        {items.length > 1 && parsedSettings.showNavigation && (
          <div className="flex gap-4 sm:hidden">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/30 hover:bg-primary-hover transition-colors"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {items.length > 1 && parsedSettings.showPagination && (
          <div className="flex items-center gap-3">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="relative h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                style={{ width: i === current ? 32 : 10 }}
              >
                <span
                  className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                    i === current ? "bg-primary" : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
