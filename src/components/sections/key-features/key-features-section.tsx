import { CheckCircle2 } from "lucide-react";

export interface KeyFeaturesSectionProps {
  badge?: string;
  heading?: string;
  highlight?: string;
  features: string[];
}

export function KeyFeaturesSection({ 
  badge = "KEY FEATURES", 
  heading = "What's", 
  highlight = "Included",
  features 
}: KeyFeaturesSectionProps) {
  if (!features || features.length === 0) return null;

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
            <span className="h-px w-5 bg-orange-500 rounded-full" />
            {badge}
            <span className="h-px w-5 bg-orange-500 rounded-full" />
          </span>
          <h2 className="text-[28px] sm:text-[32px] font-bold leading-[1.2] text-[#081a4b]">
            {heading} <span className="text-orange-500">{highlight}</span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={index}
              className="flex items-start gap-3.5 rounded-xl bg-white p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-orange-200 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <CheckCircle2 size={14} strokeWidth={2.5} />
              </div>
              <p className="text-[14px] leading-relaxed text-slate-700 font-medium">
                {feature}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
