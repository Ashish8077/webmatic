import { str, arr } from "@/components/home/content-helpers";
import { VisualRenderer } from "@/components/ui/visual-renderer";
import type { VisualAsset } from "@/shared/types/visual-asset.types";

import type { SectionProps } from "@/components/home/sections/types";

import { AnimatedCounter } from "./animated-counter";

export function CompanyStatisticsSection({ content }: SectionProps) {
  const itemsRaw = arr<Record<string, unknown>>(content.items);

  // Sort items based on sortOrder
  const items = [...itemsRaw].sort(
    (a, b) => Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0),
  );

  if (items.length === 0) return null;

  return (
    <section className="relative bg-white py-16 sm:py-24 overflow-hidden border-b border-slate-100">
      <h2 className="sr-only">Company Statistics</h2>
      <div className="relative mx-auto max-w-292.5 px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center text-center px-5 py-6 transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Optional Visual */}
              {Boolean(item.visualType) && (item.visualType as string) !== "none" && (
                <div className="relative mb-5 w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-white">
                  <VisualRenderer
                    asset={item as unknown as VisualAsset}
                    className="w-full h-full rounded-xl"
                    imageClassName="object-contain p-2"
                    iconClassName="w-7 h-7 text-orange-500"
                    alt={str(item.title, "Company statistic visual")}
                  />
                </div>
              )}

              {/* Number */}
              <div className="relative mb-3 flex items-baseline justify-center">
                <span className="text-5xl lg:text-6xl font-extrabold text-[#0c2340] tracking-tight transition-colors duration-300 group-hover:text-primary">
                  <AnimatedCounter value={str(item.number)} />
                </span>
                {!!item.suffix && (
                  <span className="text-3xl lg:text-4xl font-bold text-orange-500 ml-1">
                    {str(item.suffix)}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="relative text-lg lg:text-xl font-bold text-slate-800 leading-snug mb-2">
                {str(item.title)}
              </h3>

              {/* Description */}
              {!!item.description && (
                <p className="relative max-w-xs mx-auto text-[15px] text-slate-500 leading-relaxed">
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
