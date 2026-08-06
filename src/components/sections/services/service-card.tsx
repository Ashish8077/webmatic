import { ArrowRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { VisualRenderer } from "@/components/ui/visual-renderer";
import type { VisualAsset } from "@/shared/types/visual-asset.types";
import { ServiceListItem } from "@/modules/services/types/service.types";
import { getIconComponent } from "@/components/ui/icon-registry";
import { COLOR_THEMES } from "./constants";

interface ServiceCardProps {
  service: ServiceListItem;
}



const ServiceCard = ({ service }: ServiceCardProps) => {
  // Use service ID to deterministically pick a color theme
  const themeIndex = ((Number(service.id) || 1) - 1 + COLOR_THEMES.length) % COLOR_THEMES.length;
  const theme = COLOR_THEMES[themeIndex];

  return (
    <article className={`group flex flex-col gap-5 rounded-2xl bg-slate-50 p-7 border border-slate-200 ${theme.border} shadow-sm hover:shadow-md ${theme.shadow} hover:-translate-y-1 transition-all duration-300`}>
      {/* Icon */}
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${theme.bg} ${theme.text} ${theme.hoverBg} group-hover:text-white transition-all duration-300 overflow-hidden`}>
        {service.visualType === "icon" && service.iconName ? (
          (() => {
            const Icon = getIconComponent(service.iconName);
            return Icon ? <Icon size={22} strokeWidth={1.75} /> : <LayoutGrid size={22} strokeWidth={1.75} />;
          })()
        ) : service.visualType === "image" ? (
          <VisualRenderer
            asset={service as unknown as VisualAsset}
            className="w-full h-full"
          />
        ) : (
          <LayoutGrid size={22} strokeWidth={1.75} />
        )}
      </div>



      {/* Title */}
      <h3 className={`text-[16px] font-bold text-navy leading-[1.375] ${theme.text.replace('text-', 'group-hover:text-')} transition-colors duration-200`}>
        {service.name}
      </h3>

      {/* Description */}
      <p className="text-[14px] leading-relaxed text-slate-500 flex-1">
        {service.shortDescription}
      </p>

      {/* CTA */}
      <Link
        href={`/services/${service.slug}`}
        className={`inline-flex items-center gap-1.5 text-[14px] font-semibold ${theme.text} transition-colors duration-200 group/link`}
      >
        {service.ctaButtonText || `Talk ${service.name}`}
        <ArrowRight
          size={13}
          className="transition-transform duration-200 group-hover/link:translate-x-0.5"
        />
      </Link>
    </article>
  );
};

export default ServiceCard;
