import { ShieldCheck } from "lucide-react";
import { ServiceBenefit } from "@/modules/services/types/service.types";
import { VisualRenderer } from "@/components/ui/visual-renderer";

export interface BenefitsSectionProps {
  badge?: string;
  heading?: string;
  highlight?: string;
  benefits: (string | ServiceBenefit)[];
}

export function BenefitsSection({ 
  badge = "BENEFITS", 
  heading = "Why You", 
  highlight = "Need This",
  benefits 
}: BenefitsSectionProps) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-292.5 px-5 sm:px-8">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-green-600 mb-3">
            <span className="h-px w-5 bg-green-600 rounded-full" />
            {badge}
            <span className="h-px w-5 bg-green-600 rounded-full" />
          </span>
          <h2 className="text-[28px] sm:text-[32px] font-bold leading-[1.2] text-[#081a4b]">
            {heading} <span className="text-green-600">{highlight}</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const isString = typeof benefit === "string";
            const title = isString ? benefit : benefit.title;

            return (
              <article
                key={index}
                className="group flex flex-col gap-3.5 rounded-xl bg-white ring-1 ring-green-100 p-6 shadow-sm hover:shadow-md hover:ring-green-300 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-200 overflow-hidden">
                    {isString || (benefit as ServiceBenefit).visualType === "none" ? (
                      <ShieldCheck size={20} strokeWidth={1.75} />
                    ) : (
                      <VisualRenderer
                        asset={{
                          visualType: (benefit as ServiceBenefit).visualType,
                          iconName: (benefit as ServiceBenefit).iconName ?? null,
                          imageId: (benefit as ServiceBenefit).imageId ?? null,
                          image: (benefit as ServiceBenefit).image ?? null,
                        }}
                        className="w-5 h-5"
                        iconClassName="w-full h-full"
                      />
                    )}
                  </div>
                </div>

                <span className="h-0.5 w-7 bg-green-300 rounded-full" />

                <p className="text-[14px] leading-[1.6] text-slate-600 font-medium flex-1">
                  {title}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
