import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { WhyUsReason } from "./types";
import { ICON_MAP } from "./constants";

interface ServiceCardProps {
  reason: WhyUsReason;
}

export function WhyUsCards({ reason }: ServiceCardProps) {
  const { icon: Icon } = ICON_MAP[reason.key as keyof typeof ICON_MAP];

  return (
    <article className="group flex flex-col gap-4 rounded-2xl bg-white border border-slate-100 p-7 shadow-lg shadow-slate-200/80 hover:shadow-xl hover:shadow-orange-100/60 hover:border-orange-200 hover:-translate-y-1 transition-all duration-300">
      {/* Icon + number row */}
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
          <Icon size={22} strokeWidth={1.75} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors duration-200">
        {reason.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-slate-500 flex-1">
        {reason.description}
      </p>

      {/* CTA */}
      <Link
        href={reason.button.to}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors duration-200 group/link mt-1"
      >
        {reason.button.text}
        <ArrowRight
          size={13}
          className="transition-transform duration-200 group-hover/link:translate-x-0.5"
        />
      </Link>
    </article>
  );
}
