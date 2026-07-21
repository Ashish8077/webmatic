import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ServicesCta() {
  return (
    <section className="bg-white py-20 sm:py-28 border-y border-slate-100">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#081a4b] mb-6 leading-tight">
          Not sure which service is right for you?
        </h2>
        <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto">
          Schedule a free consultation with our experts. We&apos;ll assess your needs and recommend the best strategy for your business goals.
        </p>
        <Link
          href="#contact"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-900/40 hover:-translate-y-1 active:translate-y-0"
        >
          Book a Consultation
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
