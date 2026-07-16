import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FALLBACK, ICON_MAP } from "./constants";
import { ServiceCard as ServiceCardType } from "./types";

interface ServiceCardProps {
  service: ServiceCardType;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const {
    icon: Icon,
    bg,
    text,
    hoverBg,
    border,
    shadow,
  } = ICON_MAP[service.key as keyof typeof ICON_MAP] ?? FALLBACK;

  return (
    <article
      className={`group flex flex-col gap-5 rounded-2xl bg-white p-7 border border-slate-100 ${border} shadow-sm hover:shadow-lg ${shadow} hover:-translate-y-1 transition-all duration-300`}
    >
      {/* Icon */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg} ${text} ${hoverBg} group-hover:text-white transition-all duration-300`}
      >
        <Icon size={22} strokeWidth={1.75} />
      </div>

      {/* Title */}
      <h3 className="text-[17px] font-bold text-[#081a4b] leading-snug">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-slate-500 flex-1">
        {service.description}
      </p>

      {/* CTA */}
      <Link
        href="/services"
        className={`inline-flex items-center gap-1.5 text-sm font-semibold ${text} transition-colors duration-200 group/link`}
      >
        {service.button.text}
        <ArrowRight
          size={13}
          className="transition-transform duration-200 group-hover/link:translate-x-0.5"
        />
      </Link>
    </article>
  );
};

export default ServiceCard;
