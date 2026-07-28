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
      className="py-28 px-4 relative overflow-hidden"
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
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">
            Why Us
          </p>
          <h2
            id="why-us-heading"
            className="text-4xl font-bold text-foreground mb-4"
          >
            {heading}
          </h2>
          {subheading && (
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {subheading}
            </p>
          )}
        </div>

        {reasons.length > 0 && (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {reasons.map((reason, i) => (
              <li
                key={i}
                className="relative pt-8 pb-6 px-6 rounded-2xl glass border border-card-border hover:border-accent/25 transition-all duration-300"
              >
                {/* Always show Numbered indicator as per previous design */}
                <span
                  className="absolute -top-4 left-5 w-8 h-8 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-accent/40 tabular-nums"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Render icon inside a consistent 48x48 box exactly like ServiceCards, or use VisualRenderer for images */}
                {reason.visualType === "icon" && reason.iconName ? (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent shadow-sm">
                    {(() => {
                      const Icon = getIconComponent(reason.iconName);
                      return Icon ? <Icon size={22} strokeWidth={1.75} /> : null;
                    })()}
                  </div>
                ) : reason.visualType === "image" ? (
                  <div className="mb-4 h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shadow-sm overflow-hidden">
                    <VisualRenderer
                      asset={reason as VisualAsset}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}

                <h3 className="text-base font-semibold text-foreground mb-2">
                  {str(reason.title)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
