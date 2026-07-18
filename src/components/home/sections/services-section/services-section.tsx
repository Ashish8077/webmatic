import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ServiceCard from "./service-card";
import { SectionProps } from "../types";
import { normaliseServiceContent } from "./mapper";
import { RawServiceContent } from "./types";

export const ServiceSection = ({ content }: SectionProps) => {
  const service = normaliseServiceContent(
    content as unknown as RawServiceContent,
  );

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        {/* ── Section header ──────────────────────────────── */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <span className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
              {service.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-[#081a4b]">
              {service.heading}{" "}
              <span className="text-orange-500">{service.highlight}</span>
            </h2>
          </div>

          <Link
            href={service.viewAllButton.to}
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[#081a4b] hover:text-orange-500 transition-colors duration-200 group"
          >
            {service.viewAllButton.text}
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* ── Services grid ───────────────────────────────── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        {/* ── Bottom CTA strip ────────────────────────────── */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-10">
          <p className="text-sm text-slate-500 text-center sm:text-left">
            {service.bottomText}
          </p>
          <Link
            href={service.primaryButton.to}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-orange-100 hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            {service.primaryButton.text}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
