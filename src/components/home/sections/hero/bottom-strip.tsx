"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { SlideType } from "./hero.types";

const BottomStrip = ({
  current,
  goTo,
  setPaused,
  paused,
  highest,
  AUTOPLAY_DELAY,
  slides,
  goNext,
  goPrev,
  showPagination,
}: {
  current: number;
  goTo: (index: number) => void;
  setPaused: (paused: boolean) => void;
  paused: boolean;
  highest: number;
  AUTOPLAY_DELAY: number;
  slides: SlideType[];
  goNext: () => void;
  goPrev: () => void;
  showPagination?: boolean;
}) => {
  return (
    <div
      className="relative z-10 border-t border-white/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10">
        {!paused && (
          <div
            key={`progress-${current}`}
            className="h-full bg-orange-500 origin-left"
            style={{
              animation: `progress ${AUTOPLAY_DELAY}ms linear forwards`,
            }}
          />
        )}
      </div>

      <div className="max-w-360 mx-auto px-6 sm:px-12 lg:px-20 py-4 flex items-center justify-between gap-4">
        {/* Mobile dots */}
        <div className="flex sm:hidden items-center gap-2 flex-1">
          {showPagination !== false &&
            slides.map((s, i) =>
              i > highest ? null : (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${s.id}`}
                  className="relative h-2 rounded-full transition-all duration-300"
                  style={{ width: i === current ? 24 : 8 }}
                >
                  <span
                    className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                      i === current ? "bg-orange-500" : "bg-white/25"
                    }`}
                  />
                </button>
              ),
            )}
        </div>

        {/* Desktop tabs */}
        <div className="hidden sm:flex items-center gap-1 flex-1 min-w-0">
          {showPagination !== false &&
            slides.map((s, i) =>
              i > highest ? null : (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-lg transition-all duration-300"
                >
                  {i === current && (
                    <motion.div
                      layoutId="hero-tab-bg"
                      className="absolute inset-0 bg-white/10 rounded-lg border border-white/15"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  <span
                    className={`text-base font-bold leading-none transition-colors duration-300 ${
                      i === current
                        ? "text-orange-400"
                        : "text-white/25 group-hover:text-white/45"
                    }`}
                  >
                    {String(s.id).padStart(2, "0")}
                  </span>
                  <p
                    className={`text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${
                      i === current
                        ? "text-white"
                        : "text-white/35 group-hover:text-white/60"
                    }`}
                  >
                    {s.label}
                  </p>
                </button>
              ),
            )}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/50 transition-all duration-300 hover:bg-white/12 hover:text-white hover:border-white/30 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomStrip;
