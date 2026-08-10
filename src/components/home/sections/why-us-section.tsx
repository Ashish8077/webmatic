import { str, arr } from "../content-helpers";
import { VisualRenderer } from "@/components/ui/visual-renderer";
import type { VisualAsset } from "@/shared/types/visual-asset.types";
import { getIconComponent } from "@/components/ui/icon-registry";

interface SectionProps {
  content: Record<string, unknown>;
  title: string | null;
}

interface ReasonItem {
  visualType?: "none" | "icon" | "image";
  iconName?: string | null;
  imageId?: number | null;
  title: string;
  description: string;
}

/**
 * Why Choose Us — numbered card grid with a subtle glass treatment.
 *
 * Expected content keys:
 * - heading      string   — Section headline
 * - subheading   string   — Optional supporting text
 * - reasons      array    — [{ visualType, iconName, imageId, title: string; description: string }]
 */
export function WhyUsSection({ content, title }: SectionProps) {
  const heading = str(content.heading, title ?? "Why Choose Us");
  const subheading = str(content.subheading);
  const reasons = arr<ReasonItem>(content.reasons);

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="py-16 px-4 relative overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, #6366f1, transparent)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold text-accent uppercase tracking-[0.2em] mb-3">
            Why Us
          </p>
          <h2
            id="why-us-heading"
            className="text-[28px] sm:text-[32px] font-bold text-foreground mb-3"
          >
            {heading}
          </h2>
          {subheading && (
            <p className="text-muted-foreground max-w-2xl mx-auto text-[15px] leading-[1.6]">
              {subheading}
            </p>
          )}
        </div>

        {reasons.length > 0 && (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" role="list">
            {reasons.map((reason, i) => (
              <li
                key={i}
                className="relative pt-7 pb-5 px-5 rounded-xl glass border border-card-border hover:border-accent/25 transition-all duration-200"
              >
                {/* Always show Numbered indicator as per previous design */}
                <span
                  className="absolute -top-3 left-4 w-7 h-7 rounded-full bg-accent text-white text-[11px] font-bold flex items-center justify-center shadow-md shadow-accent/40 tabular-nums"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Render icon inside a consistent box or use VisualRenderer for images */}
                {reason.visualType === "icon" && reason.iconName ? (
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent shadow-sm">
                    {(() => {
                      const Icon = getIconComponent(reason.iconName);
                      return Icon ? <Icon size={20} strokeWidth={1.75} /> : null;
                    })()}
                  </div>
                ) : reason.visualType === "image" ? (
                  <div className="mb-3 h-11 w-11 rounded-lg bg-accent/10 flex items-center justify-center text-accent shadow-sm overflow-hidden">
                    <VisualRenderer
                      asset={reason as VisualAsset}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}

                <h3 className="text-[15px] font-semibold text-foreground mb-2">
                  {str(reason.title)}
                </h3>
                <p className="text-muted-foreground text-[13px] leading-relaxed">
                  {str(reason.description)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
