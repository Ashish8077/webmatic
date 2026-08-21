import { VisualRenderer } from "@/components/ui/visual-renderer";
import { mapMissionVisionContent } from "./mapper";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface Props {
  content: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

export function MissionVisionSection({ content }: Props) {
  const data = mapMissionVisionContent(content);

  const cards = [
    {
      ...data.mission,
      iconContainer: "bg-hero-primary/10 text-hero-primary group-hover:bg-hero-primary group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(10,152,212,0.3)]",
      hoverBg: "group-hover:bg-slate-50/50",
    },
    {
      ...data.vision,
      iconContainer: "bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(249,115,22,0.3)]",
      hoverBg: "group-hover:bg-orange-50/30",
    },
  ];

  return (
    <section className="relative bg-white py-16 overflow-hidden">
      <h2 className="sr-only">Mission and Vision</h2>
      <div className="relative z-10 mx-auto max-w-292.5 px-5 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
          {cards.map((card, index) => {
            return (
              <ScrollReveal key={card.title} delay={index * 0.15} direction="up" className="h-full">
                <div
                  className={`group relative h-full rounded-2xl border border-slate-100 bg-white p-8 sm:p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col ${card.hoverBg}`}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Visual */}
                    {card.visual && card.visual.visualType !== "none" && (
                      <div
                        className={`mb-6 w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 ${card.iconContainer}`}
                      >
                        <VisualRenderer 
                          asset={card.visual} 
                          className="w-full h-full flex items-center justify-center" 
                          iconClassName="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="relative text-xl sm:text-2xl font-bold text-navy mb-3 tracking-tight">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="relative text-[15px] sm:text-base leading-relaxed text-slate-500">
                      {card.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
