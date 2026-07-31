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
      className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-green-100 hover:ring-green-300 hover:shadow-[0_20px_25px_-5px_rgba(220,252,231,0.7)] hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={card.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-300">
            <span className="text-3xl">📷</span>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-green-950/25 pointer-events-none" />

        {/* The Green Badge */}
        <span className="absolute top-3 left-3 rounded-full bg-green-600 px-3 py-1 text-[12px] font-bold uppercase tracking-widest text-white shadow-sm z-10">
          {card.badge}
        </span>
      </div>

      {/* Card Body (Text Area) */}
      <div className="flex flex-1 flex-col p-5 gap-3">
        {/* Decorative Green Line */}
        <span className="h-[2px] w-8 bg-green-300 rounded-full" />
        
        <h3 className="text-[14px] font-bold text-navy group-hover:text-primary transition-colors duration-200">
          {card.title}
        </h3>
        
        {/* Flex-1 forces the CTA link to the very bottom */}
        <p className="text-[12px] leading-[1.625] text-slate-500 flex-1 line-clamp-2">
          {card.description}
        </p>
        
        <div className="flex items-center gap-1.5 text-[14px] font-semibold text-primary mt-1">
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
