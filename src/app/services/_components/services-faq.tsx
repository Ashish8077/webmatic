import { FaqAccordion } from "@/components/sections/faq/faq-accordion";
import type { FaqItem } from "@/components/sections/faq/types";

const mockFaqs: FaqItem[] = [
  {
    question: "Do you offer custom service packages?",
    answer: "Yes, we tailor our services to meet the unique needs of your business. During our initial consultation, we'll discuss your goals and create a custom package that aligns with your objectives and budget."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on scope and complexity. A standard web development project might take 4-8 weeks, while an ongoing digital marketing campaign is continuous. We provide clear timelines during the proposal stage."
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer: "Absolutely. We offer various maintenance and support packages to ensure your digital assets continue to perform optimally long after the initial launch."
  },
  {
    question: "How do we get started?",
    answer: "Getting started is easy. Simply contact us to schedule a free consultation. We'll discuss your needs, assess your current situation, and propose a strategic plan of action."
  }
];

export function ServicesFaq() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="mb-16 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-3 animate-fade-in">
            <span className="h-px w-6 bg-orange-500 rounded-full" />
            FAQ
            <span className="h-px w-6 bg-orange-500 rounded-full" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-[#081a4b] animate-fade-in" style={{ animationDelay: "100ms" }}>
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed text-slate-500 sm:text-base animate-fade-in" style={{ animationDelay: "200ms" }}>
            Find answers to common questions about our services and processes.
          </p>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <FaqAccordion items={mockFaqs} />
        </div>
      </div>
    </section>
  );
}
