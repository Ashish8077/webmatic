import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { normalizeAboutContent } from "./mapper";
import type { RawAboutContent } from "./types";
import type { SectionProps } from "../types";
import AboutCard from "./about-card";

export const AboutSection = ({ content }: SectionProps) => {
  const about = normalizeAboutContent(content as unknown as RawAboutContent);
  
  if (!about) return null;

  return (
    <section className="relative bg-white pb-16">
      {/* ── Green Header Band ─────────────────────────────── */}
      <div className="bg-green-50 pt-12 pb-24 lg:pt-16 lg:pb-28">
        <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
          <div className="flex flex-col gap-3 lg:gap-5">
            
            {/* Top: Eyebrow and Heading */}
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
                <span className="h-px w-5 bg-orange-500 rounded-full" />
                {about.badge}
              </span>
              <h2 className="text-[28px] lg:text-[32px] font-bold leading-[1.2] text-navy">
                {about.heading}{" "}
                <span className="text-orange-500">{about.highlight}</span>
              </h2>
            </div>

            {/* Bottom: Description (Left) and Link (Right) */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <p className="text-[14px] leading-[1.6] text-navy/60 lg:max-w-2xl">
                {about.description}
              </p>
              <Link
                href={about.learnMoreButton.url}
                className="shrink-0 inline-flex items-center gap-2 text-[13px] font-semibold text-primary hover:text-primary-hover transition-colors duration-200 group pb-1"
              >
                {about.learnMoreButton.text}
                <ArrowRight
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
            
          </div>
        </div>
      </div>

      {/* ── Cards Grid (Pulled up over the band) ──────────── */}
      <div className="relative z-10 mx-auto max-w-[1170px] px-5 sm:px-8 -mt-16 lg:-mt-20">
        {about.cards.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {about.cards.map((card) => (
              <AboutCard key={card.title} card={card} />
            ))}
          </div>
        )}

        {/* ── Bottom strip ────────────────────────────────── */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-7">
          <p className="text-[13px] text-slate-500 text-center sm:text-left">
            {about.bottomText}
          </p>
          <Link
            href={about.primaryButton.url}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-[14px] font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary-hover transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            {about.primaryButton.text}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
