import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as motion from "motion/react-client";
import { SectionProps } from "@/components/home/sections/types";
import { normalizeFaqContent } from "./mapper";
import type { RawFaqContent } from "./types";
import { FaqAccordion } from "./faq-accordion";

export function FaqSection({ content }: SectionProps) {
  const faqData = normalizeFaqContent(content as unknown as RawFaqContent);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-292.5 px-5 sm:px-8">
        {/* ── Section Header ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
            <span className="h-px w-5 bg-orange-500 rounded-full" />
            {faqData.badge}
            <span className="h-px w-5 bg-orange-500 rounded-full" />
          </span>
          <h2 className="text-[28px] sm:text-[32px] font-bold leading-[1.2] text-[#081a4b]">
            {faqData.heading}{" "}
            <span className="text-orange-500">{faqData.highlight}</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-[14px] leading-relaxed text-slate-500 sm:text-[15px]">
            {faqData.description}
          </p>
        </motion.div>

        {/* ── FAQ Accordion (Client Component) ───────────── */}
        <FaqAccordion items={faqData.items} />

        {/* ── Bottom CTA ──────────────────────────────────── */}
        {faqData.bottomText && faqData.primaryButton && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <p className="text-[13px] font-medium text-slate-600 text-center sm:text-left">
              {faqData.bottomText}
            </p>
            <Link
              href={faqData.primaryButton.to}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-[14px] font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary-hover transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              {faqData.primaryButton.text}
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
