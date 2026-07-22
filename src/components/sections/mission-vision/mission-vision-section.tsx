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
      accentColor: "bg-primary/10 text-primary",
    },
    {
      icon: Eye,
      title: data.visionTitle,
      description: data.visionDescription,
      accentColor: "bg-orange-50 text-orange-500",
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="relative rounded-2xl border border-slate-100 bg-white p-10 lg:p-14 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center ${card.accentColor}`}
                >
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-[22px] lg:text-[26px] font-bold text-navy mb-4 leading-tight">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] leading-[1.75] text-slate-500">
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
