import { ArrowRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { VisualRenderer } from "@/components/ui/visual-renderer";
import type { VisualAsset } from "@/shared/types/visual-asset.types";
import { ServiceListItem } from "@/modules/services/types/service.types";

interface ServiceCardProps {
  service: ServiceListItem;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const hasVisual = service.visualType && service.visualType !== "none";

  console.log(service);

  return (
    <article className="group flex flex-col gap-5 rounded-2xl bg-white p-7 border border-slate-100 hover:border-primary/20 shadow-sm hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 overflow-hidden">
        {hasVisual ? (
          <VisualRenderer
            asset={service as unknown as VisualAsset}
            className="w-full h-full"
            iconClassName="w-[22px] h-[22px] text-primary group-hover:text-white transition-colors duration-300"
          />
        ) : (
          <LayoutGrid size={22} strokeWidth={1.75} />
        )}
      </div>

      {/* Title */}
      <h3 className="text-[16px] font-bold text-navy leading-[1.375] group-hover:text-primary transition-colors duration-200">
        {service.name}
      </h3>

      {/* Description */}
      <p className="text-[14px] leading-[1.625] text-slate-500 flex-1">
        {service.shortDescription}
      </p>

      {/* CTA */}
      <Link
        href={`/services/${service.slug}`}
        className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary transition-colors duration-200 group/link"
      >
        Talk {service.name}
        <ArrowRight
          size={13}
          className="transition-transform duration-200 group-hover/link:translate-x-0.5"
        />
      </Link>
    </article>
  );
};

export default ServiceCard;
