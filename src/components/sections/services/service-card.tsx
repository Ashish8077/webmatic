import React from "react";
import { ArrowRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { VisualRenderer } from "@/components/ui/visual-renderer";
import type { VisualAsset } from "@/shared/types/visual-asset.types";
import { ServiceListItem } from "@/modules/services/types/service.types";
import { getIconComponent } from "@/components/ui/icon-registry";

interface ServiceCardProps {
  service: ServiceListItem;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <article className="group relative flex flex-col gap-5 rounded-2xl bg-white p-7 border border-slate-200/60 shadow-sm hover:shadow-md hover:shadow-orange-500/5 hover:-translate-y-1 hover:border-orange-500/20 transition-all duration-300 overflow-hidden">
      {/* Decorative top border gradient on hover (animates from center outwards) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-0 bg-linear-to-r from-orange-500 via-orange-400 to-orange-500 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

      {/* Icon or Visual */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-orange-500 group-hover:text-white group-hover:scale-[1.05] transition-all duration-300 overflow-hidden shadow-sm">
        {(() => {
          if (service.visualType === "icon" && service.iconName) {
            const IconComponent = getIconComponent(service.iconName);
            if (IconComponent) {
              return React.createElement(IconComponent, { size: 22, strokeWidth: 1.75 });
            }
            return <LayoutGrid size={22} strokeWidth={1.75} />;
          }

          if (service.visualType === "image" && service.image) {
            return (
              <VisualRenderer
                asset={service as unknown as VisualAsset}
                className="w-full h-full"
                imageClassName="transition-transform duration-500 group-hover:scale-[1.02]"
              />
            );
          }

          // Case D: Neither (or broken image reference) -> fallback
          return <LayoutGrid size={22} strokeWidth={1.75} />;
        })()}
      </div>

      {/* Title */}
      <h3 className="text-[16px] font-bold text-navy leading-snug group-hover:text-orange-500 transition-colors duration-200">
        {service.name}
      </h3>

      {/* Description */}
      <p className="text-[14px] leading-relaxed text-slate-500 flex-1">
        {service.shortDescription}
      </p>

      {/* CTA */}
      <Link
        href={`/services/${service.slug}`}
        className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary group-hover:text-orange-500 transition-colors duration-200 group/link mt-2"
      >
        {service.ctaButtonText || `Talk ${service.name}`}
        <ArrowRight
          size={13}
          className="transition-transform duration-200 group-hover/link:translate-x-1"
        />
      </Link>
    </article>
  );
};

export default ServiceCard;
