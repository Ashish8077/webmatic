import { CheckCircle2 } from "lucide-react";

interface ServiceFeaturesProps {
  features: string[];
}

export function ServiceFeatures({ features }: ServiceFeaturesProps) {
  if (!features || features.length === 0) return null;

  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
            <span className="h-px w-6 bg-orange-500 rounded-full" />
            KEY FEATURES
            <span className="h-px w-6 bg-orange-500 rounded-full" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-[#081a4b]">
            What's <span className="text-orange-500">Included</span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={index}
              className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-orange-200 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <CheckCircle2 size={16} strokeWidth={2.5} />
              </div>
              <p className="text-[15px] leading-relaxed text-slate-700 font-medium">
                {feature}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
