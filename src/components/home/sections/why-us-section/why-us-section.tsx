import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionProps } from "../types";
import { normaliseWhyUsContent } from "./mapper";
import type { RawWhyUsContent } from "./types";
import { WhyUsCards } from "./why-us-card";

export const WhyChooseUsSection = ({ content }: SectionProps) => {
  const whyChooseSection = normaliseWhyUsContent(
    content as unknown as RawWhyUsContent,
  );

  return (
    <div className="relative">
      {/* ── Compact dark header band ──────────────────────── */}
      <div className="[background:linear-gradient(to_right,#1f0757,#3354a4,#1f0757)] pt-14 sm:pt-20 pb-32 sm:pb-40">
        <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
                <span className="h-px w-6 bg-orange-500 rounded-full" />
                {whyChooseSection.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-white">
                {whyChooseSection.heading}{" "}
                <span className="text-orange-500">
                  {whyChooseSection.highlight}
                </span>
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400">
                {whyChooseSection.description}
              </p>
            </div>
            <Link
              href={whyChooseSection.learnMoreButton.to}
              className="shrink-0 self-start sm:self-end inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-200 group"
            >
              {whyChooseSection.learnMoreButton.text}
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Diagonal cut — clips bottom of dark band */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            className="w-full h-12 sm:h-16"
          >
            <polygon points="0,60 1200,0 1200,60" fill="white" />
          </svg>
        </div>
      </div>

      {/* ── Cards — pulled up over the boundary ──────────── */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1170px] px-5 sm:px-8 -mt-24 sm:-mt-32 pb-16 sm:pb-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseSection.reasons.map((reason, i) => {
              // const Icon = defaultReasons[i]?.icon || defaultReasons[0].icon;
              return <WhyUsCards key={reason.key} reason={reason} />;
            })}
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-8">
            <p className="text-sm text-slate-500 text-center sm:text-left">
              {whyChooseSection.bottomText}
            </p>
            <Link
              href={whyChooseSection.primaryButton.to}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-orange-200 hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              {whyChooseSection.primaryButton.text}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
