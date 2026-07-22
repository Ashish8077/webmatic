import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { SlideType } from "./hero.types";

const HeroContent = ({ slide }: { slide: SlideType }) => {
  return (
    <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 sm:px-10 pt-8 pb-28 text-center">
      {/* Badge */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-hero-accent/20 bg-white/80 backdrop-blur-md px-4 py-2 text-sm font-semibold tracking-wide text-hero-accent shadow-sm animate-fade-in">
        <span className="h-2 w-2 rounded-full bg-hero-accent animate-pulse" />
        <span className="max-w-[200px] sm:max-w-none truncate sm:whitespace-normal">
          {slide.label}
        </span>
      </div>

      {/* Hero Heading */}
      <h1 className="max-w-[896px] min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex flex-col items-center justify-center text-[30px] sm:text-[36px] md:text-[48px] font-extrabold leading-[1.15] tracking-tight text-hero-navy animate-slide-up">
        {slide.heading}{" "}
        <span className="text-hero-accent">{slide.highlight}</span>
      </h1>

      {/* Hero Subtitle */}
      <p
        className="mt-5 min-h-[56px] sm:min-h-[64px] max-w-[512px] text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[1.625] text-slate-500 animate-slide-up"
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
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-hero-primary px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_6px_18px_rgba(10,152,212,0.2)] transition-all duration-200 hover:bg-hero-primary-hover hover:-translate-y-0.5 active:translate-y-0"
        >
          {slide.primaryButton.text}
          <ChevronRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
        <Link
          href={slide.secondaryButton.to}
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 backdrop-blur-sm px-7 py-3.5 text-[14px] font-semibold text-hero-navy transition-all duration-200 hover:bg-white hover:border-slate-400 hover:-translate-y-0.5 active:translate-y-0"
        >
          {slide.secondaryButton.text}
        </Link>
      </div>
    </div>
  );
};

export default HeroContent;
