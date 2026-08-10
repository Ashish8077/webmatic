import { str, arr } from "@/components/home/content-helpers";
import { VisualRenderer } from "@/components/ui/visual-renderer";
import type { VisualAsset } from "@/shared/types/visual-asset.types";

import type { SectionProps } from "@/components/home/sections/types";

export function CompanyStatisticsSection({ content }: SectionProps) {
  const itemsRaw = arr<Record<string, unknown>>(content.items);

  // Sort items based on sortOrder
  const items = [...itemsRaw].sort(
    (a, b) => Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0),
  );

  if (items.length === 0) return null;

  return (
    <section className="relative bg-white py-12 overflow-hidden border-b border-slate-100">
      <h2 className="sr-only">Company Statistics</h2>
      <div className="relative mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center text-center px-5 py-6 bg-slate-50 rounded-xl shadow-sm border border-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Decorative gradient blur (visible on hover) */}
              <div className="absolute inset-0 bg-gradient-to-br from-hero-primary/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 rounded-xl pointer-events-none" />

              {/* Optional Visual */}
              {Boolean(item.visualType) && (item.visualType as string) !== "none" && (
                <div className="relative mb-3 w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                  <VisualRenderer
                    asset={item as unknown as VisualAsset}
                    className="w-full h-full rounded-lg"
                    imageClassName="object-contain p-1.5"
                    iconClassName="w-6 h-6 text-orange-500"
                    alt={str(item.title, "Company statistic visual")}
                  />
                </div>
              )}

              {/* Number */}
              <div className="relative mb-2 flex items-baseline justify-center">
                <span className="text-4xl font-bold text-navy tracking-tight transition-colors duration-200 group-hover:text-hero-primary">
                  {str(item.number)}
                </span>
                {!!item.suffix && (
                  <span className="text-2xl font-bold text-orange-500 ml-0.5">
                    {str(item.suffix)}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="relative text-[15px] font-semibold text-slate-800 leading-snug">
                {str(item.title)}
              </h3>

              {/* Description */}
              {!!item.description && (
                <p className="relative mt-1.5 text-[13px] text-slate-500 leading-relaxed">
                  {str(item.description)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
