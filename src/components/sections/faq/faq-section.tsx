import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionProps } from "@/components/home/sections/types";
import { normaliseFaqContent } from "./mapper";
import type { RawFaqContent } from "./types";
import { FaqAccordion } from "./faq-accordion";

export function FaqSection({ content }: SectionProps) {
  const faqData = normaliseFaqContent(content as unknown as RawFaqContent);

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        {/* ── Section Header ──────────────────────────────── */}
        <div className="mb-16 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
            <span className="h-px w-6 bg-orange-500 rounded-full" />
            {faqData.badge}
            <span className="h-px w-6 bg-orange-500 rounded-full" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-[#081a4b]">
            {faqData.heading}{" "}
            <span className="text-orange-500">{faqData.highlight}</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed text-slate-500 sm:text-base">
            {faqData.description}
          </p>
        </div>

        {/* ── FAQ Accordion (Client Component) ───────────── */}
        <FaqAccordion items={faqData.items} />

        {/* ── Bottom CTA ──────────────────────────────────── */}
        {faqData.bottomText && faqData.primaryButton && (
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <p className="text-sm font-medium text-slate-600 text-center sm:text-left">
              {faqData.bottomText}
            </p>
            <Link
              href={faqData.primaryButton.to}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-orange-200 hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              {faqData.primaryButton.text}
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
