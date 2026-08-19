import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as motion from "motion/react-client";
import { SectionProps } from "../types";
import { normalizeWhyUsContent } from "./mapper";
import type { RawWhyUsContent } from "./types";
import { WhyUsCards } from "./why-us-card";

export const WhyChooseUsSection = ({ content }: SectionProps) => {
  const whyChooseSection = normalizeWhyUsContent(
    content as unknown as RawWhyUsContent,
  );

  return (
    <div className="relative">
      {/* ── Header band ──────────────────────── */}
      <div className="bg-slate-50 pt-14 pb-32 lg:pt-20 lg:pb-40 relative">
        <div className="mx-auto max-w-292.5 px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          >
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
              <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-slate-500">
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
          </motion.div>
        </div>

        {/* Diagonal cut */}
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

      {/* ── Cards ──────────── */}
      <div className="bg-white">
        <div className="mx-auto max-w-292.5 px-5 sm:px-8 -mt-24 lg:-mt-32 pb-16 sm:pb-20 relative z-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseSection.reasons.map((reason, index) => {
              return (
                <WhyUsCards
                  key={reason.key}
                  reason={reason}
                  index={index}
                />
              );
            })}
          </div>

          {/* Bottom CTA strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-8"
          >
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};
