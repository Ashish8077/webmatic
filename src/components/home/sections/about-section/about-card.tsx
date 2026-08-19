import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { CardItem } from "./types";

import Image from "next/image";
import { getMediaUrl } from "@/features/media/utils/media-url";

interface AboutCardProps {
  card: CardItem;
}

const AboutCard = ({ card }: AboutCardProps) => {
  const imageUrl = getMediaUrl(card.image);

  return (
    <Link
      href={card.button.url}
      className="group relative flex flex-col overflow-hidden rounded-[20px] bg-white border border-slate-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:border-orange-500/30 hover:-translate-y-1.5 transition-all duration-500 ease-out"
    >
      {/* Shine effect */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-[20px]">
        <div className="absolute top-0 left-[-150%] h-full w-full -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:left-[150%] transition-all duration-1000 ease-in-out" />
      </div>

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-slate-50">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={card.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            unoptimized
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-300">
            <span className="text-3xl">📷</span>
          </div>
        )}
        
        {/* Subtle Inner Shadow overlay instead of heavy gradient */}
        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />

        {/* Modernized Badge */}
        <span className="absolute top-4 left-4 rounded-full bg-white/95 backdrop-blur-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-orange-500 shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-10 transition-transform duration-500 ease-out group-hover:scale-105">
          {card.badge}
        </span>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-6 gap-3.5">
        {/* Decorative Line (Expands & changes color on hover) */}
        <span className="h-[2px] w-8 bg-green-400 rounded-full transition-all duration-500 ease-out group-hover:w-16 group-hover:bg-orange-500" />
        
        <h3 className="text-[16px] font-bold text-navy group-hover:text-orange-500 transition-colors duration-300">
          {card.title}
        </h3>
        
        <p className="text-[13px] leading-[1.6] text-slate-500 flex-1 line-clamp-3">
          {card.description}
        </p>
        
        <div className="flex items-center gap-2 text-[13px] font-bold text-primary group-hover:text-orange-500 transition-colors duration-300 mt-2">
          <span className="relative">
            {card.button.text}
            <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-orange-500 transition-all duration-300 ease-out group-hover:w-full" />
          </span>
          <ArrowRight
            size={14}
            className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
          />
        </div>
      </div>
    </Link>
  );
};

export default AboutCard;
