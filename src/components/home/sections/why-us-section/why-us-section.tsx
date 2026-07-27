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

  console.log(content);

  return (
    <div className="relative">
      {/* ── Green header band ──────────────────────── */}
      <div className="bg-green-50 pt-14 pb-32 lg:pt-20 lg:pb-40 relative">
        <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
                <span className="h-px w-6 bg-orange-500 rounded-full" />
                {whyChooseSection.badge}
              </span>
              <h2 className="text-[30px] lg:text-[36px] font-bold leading-[1.15] text-navy">
                {whyChooseSection.heading}{" "}
                <span className="text-orange-500">
                  {whyChooseSection.highlight}
                </span>
              </h2>
              <p className="mt-3 max-w-lg text-[14px] leading-[1.625] text-slate-500">
                {whyChooseSection.description}
              </p>
            </div>
            <Link
              href={whyChooseSection.learnMoreButton.to}
              className="shrink-0 self-start sm:self-end inline-flex items-center gap-2 text-[14px] font-semibold text-primary hover:text-primary-hover transition-colors duration-200 group"
            >
              {whyChooseSection.learnMoreButton.text}
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Diagonal cut — clips bottom of green band */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            className="w-full h-12 lg:h-16"
          >
            <polygon points="0,60 1200,0 1200,60" fill="white" />
          </svg>
        </div>
      </div>

      {/* ── Cards — pulled up over the boundary ──────────── */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1170px] px-5 sm:px-8 -mt-24 lg:-mt-32 pb-16 sm:pb-20 relative z-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseSection.reasons.map((reason, index) => {
              return (
                <WhyUsCards
                  key={reason.key}
                  reason={reason}
                  index={index + 1}
                />
              );
            })}
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-8">
            <p className="text-[14px] text-slate-500 text-center sm:text-left">
              {whyChooseSection.bottomText}
            </p>
            <Link
              href={whyChooseSection.primaryButton.to}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-[14px] font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary-hover transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
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
