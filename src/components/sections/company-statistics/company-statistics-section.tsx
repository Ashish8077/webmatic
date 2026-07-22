import type { CompanyStatisticsContentValues } from "@/features/page-sections/schemas/company-statistics.schema";
import { str, arr } from "@/components/home/content-helpers";

import type { SectionProps } from "@/components/home/sections/types";

export function CompanyStatisticsSection({ content }: SectionProps) {
  const itemsRaw = arr<Record<string, unknown>>(content.items);
  
  // Sort items based on sortOrder
  const items = [...itemsRaw].sort(
    (a, b) => Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0)
  );

  if (items.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-100">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-16">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col sm:flex-row items-center sm:items-start md:items-center justify-between text-center sm:text-left gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-slate-50"
            >
              {/* Text on left */}
              <div className="order-2 sm:order-1 flex-1">
                <h3 className="text-sm sm:text-base font-medium text-slate-500 leading-relaxed max-w-[200px] mx-auto sm:mx-0">
                  {str(item.title)}
                </h3>
                {!!item.description && (
                  <p className="mt-2 text-xs text-slate-400">
                    {str(item.description)}
                  </p>
                )}
              </div>
              
              {/* Number on right */}
              <div className="order-1 sm:order-2 flex-shrink-0">
                <span className="text-5xl sm:text-6xl font-bold text-orange-500 tracking-tight">
                  {str(item.number)}
                  {!!item.suffix && (
                    <span className="text-4xl sm:text-5xl">{str(item.suffix)}</span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
