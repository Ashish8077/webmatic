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
    <section className="relative bg-white py-20 lg:py-28 overflow-hidden border-b border-slate-100">
      <h2 className="sr-only">Company Statistics</h2>
      <div className="relative mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center text-center px-6 py-10 lg:p-12 bg-slate-50 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
            >
              {/* Decorative gradient blur (visible on hover) */}
              <div className="absolute inset-0 bg-gradient-to-br from-hero-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-3xl pointer-events-none" />

              {/* Decorative top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-orange-500/80 rounded-b-full transition-all duration-500 group-hover:w-32 group-hover:bg-hero-primary" />

              {/* Optional Visual */}
              {Boolean(item.visualType) && (item.visualType as string) !== "none" && (
                <div className="relative mb-6 w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <VisualRenderer
                    asset={item as unknown as VisualAsset}
                    className="w-full h-full rounded-2xl"
                    iconClassName="w-8 h-8 text-orange-500"
                  />
                </div>
              )}

              {/* Number */}
              <div className="relative mb-5 flex items-baseline justify-center">
                <span className="text-6xl lg:text-7xl font-extrabold text-navy tracking-tight transition-colors duration-500 group-hover:text-hero-primary">
                  {str(item.number)}
                </span>
                {!!item.suffix && (
                  <span className="text-4xl lg:text-5xl font-bold text-orange-500 ml-1">
                    {str(item.suffix)}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="relative text-lg lg:text-xl font-semibold text-slate-800 leading-snug">
                {str(item.title)}
              </h3>

              {/* Description */}
              {!!item.description && (
                <p className="relative mt-3 text-sm lg:text-base text-slate-500 leading-relaxed max-w-sm">
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
