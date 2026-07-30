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
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-green-600 mb-3">
            <span className="h-px w-6 bg-green-600 rounded-full" />
            {badge}
            <span className="h-px w-6 bg-green-600 rounded-full" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-[#081a4b]">
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
                className="group flex flex-col gap-4 rounded-2xl bg-white ring-1 ring-green-100 p-7 shadow-lg shadow-green-100/80 hover:shadow-xl hover:shadow-green-200/60 hover:ring-green-300 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 overflow-hidden">
                    {isString || (benefit as ServiceBenefit).visualType === "none" ? (
                      <ShieldCheck size={22} strokeWidth={1.75} />
                    ) : (
                      <VisualRenderer
                        asset={{
                          visualType: (benefit as ServiceBenefit).visualType,
                          iconName: (benefit as ServiceBenefit).iconName ?? null,
                          imageId: (benefit as ServiceBenefit).imageId ?? null,
                        }}
                        className="w-[22px] h-[22px]"
                        iconClassName="w-full h-full"
                      />
                    )}
                  </div>
                </div>

                <span className="h-[2px] w-8 bg-green-300 rounded-full mt-1" />

                <p className="text-[15px] leading-[1.625] text-slate-600 font-medium mt-2 flex-1">
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
