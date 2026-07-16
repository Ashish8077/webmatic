import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { SlideType } from "./hero.types";

const HeroContent = ({ slide }: { slide: SlideType }) => {
  return (
    <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 sm:px-10 pt-8 pb-28 text-center">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-semibold tracking-wide text-orange-500 shadow-sm animate-fade-in">
        <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
        <span className="max-w-[200px] sm:max-w-none truncate sm:whitespace-normal">
          {slide.label}
        </span>
      </div>

      <h1 className="max-w-4xl min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex flex-col items-center justify-center text-3xl font-extrabold leading-[1.15] tracking-tight text-[#0c174c] sm:text-4xl md:text-5xl animate-slide-up">
        {slide.heading}{" "}
        <span className="text-orange-500">{slide.highlight}</span>
      </h1>

      <p
        className="mt-5 min-h-[56px] sm:min-h-[64px] max-w-lg text-sm leading-relaxed text-slate-500 sm:text-base md:text-lg animate-slide-up"
        style={{ animationDelay: "80ms" }}
      >
        {slide.subheadline}
      </p>

      {/* CTAs */}
      <div
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto animate-slide-up"
        style={{ animationDelay: "150ms" }}
      >
        <Link
          href={slide.primaryButton.to}
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-all duration-200 hover:bg-orange-600 hover:-translate-y-0.5 active:translate-y-0"
        >
          {slide.primaryButton.text}
          <ChevronRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
        <Link
          href={slide.secondaryButton.to}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-[#0c174c] transition-all duration-200 hover:bg-white hover:border-slate-400 hover:-translate-y-0.5 active:translate-y-0"
        >
          {slide.secondaryButton.text}
        </Link>
      </div>
    </div>
  );
};

export default HeroContent;
