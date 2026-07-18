import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { CardItem } from "./types";

interface AboutCardProps {
  card: CardItem;
}

const AboutCard = ({ card }: AboutCardProps) => {
  return (
    <Link
      href={card.button.url}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-slate-100">
        {card.imageId ? (
          <img
            src={`/api/media/${card.imageId}`}
            alt={card.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-300">
            <span className="text-3xl">📷</span>
          </div>
        )}
        <span className="absolute top-3 left-3 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
          {card.badge}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 gap-2.5">
        <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors duration-200">
          {card.title}
        </h3>
        <p className="text-xs leading-relaxed text-slate-500 flex-1 line-clamp-2">
          {card.description}
        </p>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-500 mt-1">
          {card.button.text}
          <ArrowRight
            size={12}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
};

export default AboutCard;
