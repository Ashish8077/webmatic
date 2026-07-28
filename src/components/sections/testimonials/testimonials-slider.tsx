"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote, User } from "lucide-react";
import { TestimonialItem } from "@/modules/testimonials/types/service.types";

interface TestimonialsSliderProps {
  items: TestimonialItem[];
}

export function TestimonialsSlider({ items }: TestimonialsSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((index + items.length) % items.length);
      setTimeout(() => setIsAnimating(false), 500); // match transition duration
    },
    [items.length, isAnimating],
  );

  const prev = () => goTo(current - 1);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (paused || items.length === 0) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused, items.length]);

  if (items.length === 0) {
    return null;
  }

  const t = items[current];

  return (
    <div className="relative mx-auto max-w-4xl px-4 sm:px-12">
      <div
        className="relative group"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative rounded-2xl bg-slate-50 border border-slate-200 px-6 sm:px-16 py-12 sm:py-16 text-center shadow-sm hover:shadow-md transition-all duration-500">
          {/* Quote icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30 ring-4 ring-white">
            <Quote size={24} className="text-white fill-white" />
          </div>

          <div
            className={`transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}
          >
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    t.rating > i
                      ? "text-orange-500 fill-orange-500"
                      : "text-slate-200 fill-slate-200"
                  }
                />
              ))}
            </div>

            {/* Title */}
            {t.title && (
              <h3 className="text-2xl sm:text-3xl font-bold text-navy leading-tight mb-4">
                {t.title}
              </h3>
            )}

            {/* Description */}
            <p
              className={`text-lg sm:text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto font-medium italic ${!t.title ? "mt-4" : ""}`}
            >
              &quot;{t.description}&quot;
            </p>

            {/* Author */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4">
              <div className="relative h-16 w-16 shrink-0 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden flex items-center justify-center shadow-sm">
                {t.profileImageId ? (
                  <Image
                    src={`/api/media/${t.profileImageId}`}
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
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-navy">{t.clientName}</p>
                {(t.designation || t.companyName) && (
                  <p className="text-sm text-slate-500 mt-1 font-medium">
                    {t.designation}
                    {t.designation && t.companyName && (
                      <span className="mx-1.5 opacity-50">•</span>
                    )}
                    {t.companyName && (
                      <span className="text-orange-600">{t.companyName}</span>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Prev / Next arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-6 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 shadow-md hover:border-primary hover:text-primary hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300 z-10 opacity-0 sm:opacity-100 group-hover:opacity-100"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/30 hover:bg-primary-hover hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300 z-10 opacity-0 sm:opacity-100 group-hover:opacity-100"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {items.length > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 focus:outline-none ${
                i === current
                  ? "w-8 h-2.5 bg-primary"
                  : "w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
