import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { normaliseAboutContent } from "./mapper";
import type { RawAboutContent } from "./types";
import type { SectionProps } from "../types";
import AboutCard from "./about-card";
export const AboutSection = ({ content }: SectionProps) => {
  const about = normaliseAboutContent(content as unknown as RawAboutContent);
  
  if (!about) return null;

  return (
    <section className="bg-gray-900 py-14 sm:py-20">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        {/* ── Section header ─────────────────────────────── */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
              <span className="h-px w-6 bg-orange-500 rounded-full" />
              {about.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-white">
              {about.heading}{" "}
              <span className="text-orange-500">{about.highlight}</span>
            </h2>
          </div>

          <div className="lg:max-w-sm flex flex-col gap-3">
            <p className="text-sm leading-relaxed text-slate-400">
              {about.description}
            </p>
            <Link
              href={about.learnMoreButton.url}
              className="self-start inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-200 group"
            >
              {about.learnMoreButton.text}
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* ── Cards ───────────────────────────────────────── */}
        {about.cards.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.cards.map((card) => (
              <AboutCard key={card.title} card={card} />
            ))}
          </div>
        )}

        {/* ── Bottom strip ────────────────────────────────── */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-sm text-slate-400 text-center sm:text-left">
            {about.bottomText}
          </p>
          <Link
            href={about.primaryButton.url}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-900/30 hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            {about.primaryButton.text}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
