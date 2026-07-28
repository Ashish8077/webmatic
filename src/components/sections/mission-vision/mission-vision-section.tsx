import { Target, Eye } from "lucide-react";
import { type MissionVisionContentValues } from "@/features/page-sections/schemas/mission-vision.schema";

interface Props {
  content: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

export function MissionVisionSection({ content }: Props) {
  const data = content as unknown as MissionVisionContentValues;

  const cards = [
    {
      icon: Target,
      title: data.missionTitle,
      description: data.missionDescription,
      accentColor: "text-hero-primary group-hover:bg-hero-primary group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(10,152,212,0.3)]",
      bgHover: "from-hero-primary/5",
      bgBase: "bg-hero-primary/10",
      topAccent: "bg-hero-primary",
    },
    {
      icon: Eye,
      title: data.visionTitle,
      description: data.visionDescription,
      accentColor: "text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(249,115,22,0.3)]",
      bgHover: "from-orange-50/50",
      bgBase: "bg-orange-50",
      topAccent: "bg-orange-500",
    },
  ];

  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      <h2 className="sr-only">Mission and Vision</h2>
      <div className="relative z-10 mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group relative rounded-3xl border border-slate-100 bg-white p-10 lg:p-16 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col"
              >
                {/* Decorative subtle gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bgHover} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Top accent line */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-b-full transition-all duration-500 opacity-30 group-hover:opacity-100 group-hover:w-32 ${card.topAccent}`} />

                {/* Icon */}
                <div
                  className={`mb-8 w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${card.bgBase} ${card.accentColor}`}
                >
                  <Icon className="w-9 h-9" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="relative text-[26px] lg:text-[32px] font-extrabold text-navy mb-5 leading-tight tracking-tight">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="relative text-[16px] leading-[1.8] text-slate-500">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
