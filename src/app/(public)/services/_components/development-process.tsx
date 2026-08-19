import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

import type { SectionProps } from "@/components/home/sections/types";
import { getIconComponent } from "@/components/ui/icon-registry";
import { VisualRenderer } from "@/components/ui/visual-renderer";
import type { VisualAsset } from "@/shared/types/visual-asset.types";
import type { DevelopmentProcessContentValues } from "@/features/page-sections/schemas/development-process.schema";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function DevelopmentProcessSection({ content }: Partial<SectionProps>) {
  const data = content as unknown as DevelopmentProcessContentValues;
  if (!data) return null;
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-292.5 px-5 sm:px-8">
        {/* Header */}
        <ScrollReveal delay={0.1}>
          <div className="mb-14 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-orange-500">
              <span className="h-px w-6 bg-orange-500 rounded-full" />
              {data.badge}
              <span className="h-px w-6 bg-orange-500 rounded-full" />
            </span>
            <h2 className="text-[30px] md:text-[36px] font-bold leading-[1.15] text-navy max-w-3xl">
              {data.heading}{" "}
              <span className="text-orange-500">{data.highlight}</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.steps?.map((step, index) => {
            const Icon = getIconComponent(step.iconName ?? "");
            return (
              <ScrollReveal key={step.key || index} delay={index * 0.15} direction="up" className="h-full">
                <article
                  className="group h-full flex flex-col gap-5 rounded-2xl bg-white p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-orange-200 hover:shadow-orange-100/50"
                >
                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 overflow-hidden shrink-0">
                    {step.visualType === "icon" && Icon ? (
                      <Icon size={26} strokeWidth={1.75} />
                    ) : step.visualType === "image" ? (
                      <VisualRenderer
                        asset={step as unknown as VisualAsset}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>

                  <h3 className="text-[20px] font-bold text-navy leading-snug group-hover:text-orange-500 transition-colors duration-200">
                    {step.title}
                  </h3>

                  <p className="text-[15px] leading-relaxed text-slate-500 flex-1">
                    {step.description}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Footer CTA */}
        {(data.bottomText || data.primaryButton) && (
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 border-t border-slate-200 pt-10">
            {data.bottomText && (
              <p className="text-[15px] text-slate-500 font-medium text-center sm:text-left">
                {data.bottomText}
              </p>
            )}
            {data.primaryButton && (
              <Link
                href={data.primaryButton.url}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-[14px] font-semibold text-white shadow-md shadow-primary/10 hover:bg-primary-hover transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                {data.primaryButton.text}
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
