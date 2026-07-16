"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
}) => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Progress bar */}
      <div className="h-[2px] bg-white/20">
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

      <div className="bg-white/65 backdrop-blur-md border-t border-white/40">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 flex items-center justify-between py-3 sm:py-4 gap-3">
          {/* Mobile dot indicators */}
          <div className="flex sm:hidden items-center gap-2 flex-1">
            {slides.map((s, i) =>
              i > highest ? null : (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${s.id}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-orange-500"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ),
            )}
          </div>

          {/* Desktop: number + label tabs */}
          <div className="hidden sm:flex items-stretch gap-1 overflow-x-auto no-scrollbar flex-1 min-w-0">
            {slides.map((s, i) =>
              i > highest ? null : (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  className={`group relative flex items-start gap-3 shrink-0 text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    i === current ? "bg-white shadow-sm" : "hover:bg-white/60"
                  }`}
                >
                  <span
                    className={`text-xl font-extrabold leading-none transition-colors duration-200 ${
                      i === current ? "text-orange-500" : "text-slate-300"
                    }`}
                  >
                    {String(s.id).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    {i === current && (
                      <div className="mb-1.5 h-[2px] w-10 rounded-full bg-orange-500" />
                    )}
                    <p
                      className={`text-sm sm:text-base font-semibold leading-snug whitespace-nowrap transition-colors duration-200 ${
                        i === current
                          ? "text-[#0c174c]"
                          : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    >
                      {s.label}
                    </p>
                  </div>
                </button>
              ),
            )}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:border-orange-300 hover:text-orange-500 hover:-translate-y-0.5 active:translate-y-0"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={goNext}
              aria-label="Next slide"
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-200 transition-all duration-200 hover:bg-orange-600 hover:-translate-y-0.5 active:translate-y-0"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomStrip;
