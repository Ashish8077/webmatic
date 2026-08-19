import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as motion from "motion/react-client";
import { SectionProps } from "@/components/home/sections/types";
import { normalizeServiceContent } from "./mapper";
import { RawServiceContent } from "./types";
import { getServicesService } from "@/modules/services/services/get-services.service";
import ServicesGrid from "./services-grid";

export const ServiceSection = async ({ content }: SectionProps) => {
  const service = normalizeServiceContent(
    content as unknown as RawServiceContent,
  );

  const servicesResponse = await getServicesService({
    page: 1,
    limit: 100,
    status: "published",
    sortBy: "sort_order",
    sortOrder: "asc",
  });

  return (
    <section className="bg-white py-16 relative overflow-hidden">
      <div className="mx-auto max-w-292.5 px-5 sm:px-8 relative z-10">
        {/* ── Section header ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5"
        >
          <div>
            <span className="inline-flex items-center gap-2 mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">
              <span className="h-px w-5 bg-orange-500 rounded-full" />
              {service.badge}
            </span>
            <h2 className="text-[28px] lg:text-[32px] font-bold leading-[1.2] text-navy">
              {service.heading}{" "}
              <span className="text-orange-500">{service.highlight}</span>
            </h2>
          </div>

          {service.viewAllButton?.text && (
            <Link
              href={service.viewAllButton.to || "#"}
              className="shrink-0 inline-flex items-center gap-2 text-[13px] font-semibold text-navy hover:text-orange-500 transition-colors duration-200 group"
            >
              {service.viewAllButton.text}
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </motion.div>

        {/* ── Services grid (Client Component) ────────────── */}
        <ServicesGrid services={servicesResponse.items} />

        {/* ── Bottom CTA strip ────────────────────────────── */}
        {(service.bottomText || service.primaryButton?.text) && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-8"
          >
            {service.bottomText && (
              <p className="text-[13px] text-slate-500 text-center sm:text-left">
                {service.bottomText}
              </p>
            )}
            {service.primaryButton?.text && (
              <Link
                href={service.primaryButton.to || "#"}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-[14px] font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary-hover transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                {service.primaryButton.text}
                <ArrowRight size={14} />
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};
