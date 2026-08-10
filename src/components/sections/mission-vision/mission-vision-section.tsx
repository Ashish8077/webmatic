import { VisualRenderer } from "@/components/ui/visual-renderer";
import { mapMissionVisionContent } from "./mapper";

interface Props {
  content: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

export function MissionVisionSection({ content }: Props) {
  const data = mapMissionVisionContent(content);

  const cards = [
    {
      ...data.mission,
      accentColor: "text-hero-primary group-hover:bg-hero-primary group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(10,152,212,0.3)]",
      bgHover: "from-hero-primary/5",
      bgBase: "bg-hero-primary/10",
      topAccent: "bg-hero-primary",
    },
    {
      ...data.vision,
      accentColor: "text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(249,115,22,0.3)]",
      bgHover: "from-orange-50/50",
      bgBase: "bg-orange-50",
      topAccent: "bg-orange-500",
    },
  ];

  return (
    <section className="relative bg-white py-16 overflow-hidden">
      <h2 className="sr-only">Mission and Vision</h2>
      <div className="relative z-10 mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map((card) => {
            return (
              <div
                key={card.title}
                className="group relative rounded-xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md overflow-hidden flex flex-col"
              >
                {/* Decorative subtle gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bgHover} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none`} />

                {/* Visual */}
                {card.visual && card.visual.visualType !== "none" && (
                  <div
                    className={`mb-4 w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105 overflow-hidden shrink-0 ${card.bgBase} ${card.accentColor}`}
                  >
                    <VisualRenderer 
                      asset={card.visual} 
                      className="w-full h-full flex items-center justify-center" 
                      iconClassName="w-7 h-7"
                    />
                  </div>
                )}

                {/* Title */}
                <h3 className="relative text-[20px] font-bold text-navy mb-2.5 leading-tight tracking-tight">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="relative text-[15px] leading-[1.6] text-slate-500">
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
