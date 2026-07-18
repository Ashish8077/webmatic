import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { str, num, obj } from "../content-helpers";
import type { RawCMSButton, SectionProps } from "./types";

/**
 * Contact call-to-action banner.
 *
 * Follows the robust section architecture.
 */
export function ContactCtaSection({ content, settings }: SectionProps) {
  const badge = str(content.badge);
  const heading = str(content.heading, "Ready to Get Started?");
  const description = str(content.description);

  const primaryButtonRaw = obj(content.primaryButton) as Partial<RawCMSButton>;
  const primaryButton = {
    text: str(primaryButtonRaw.text, "Contact Us"),
    url: str(primaryButtonRaw.url, "#contact"),
  };

  const secondaryButtonRaw = obj(
    content.secondaryButton,
  ) as Partial<RawCMSButton>;
  const secondaryButton = {
    text: str(secondaryButtonRaw.text),
    url: str(secondaryButtonRaw.url),
  };

  const backgroundImageId = num(content.backgroundImageId);
  const overlayOpacity = num(settings?.overlayOpacity, 50) / 100;

  return (
    <section
      id="contact-cta"
      aria-labelledby="contact-cta-heading"
      className="bg-gray-900 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        <div
          className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center shadow-xl"
          style={{
            background: backgroundImageId
              ? `url(/api/media/${backgroundImageId}) center/cover no-repeat`
              : "linear-gradient(135deg, #081a4b 0%, #060b26 100%)",
          }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-[#081a4b] pointer-events-none transition-opacity duration-300"
            style={{ opacity: overlayOpacity }}
            aria-hidden="true"
          />

          {/* Inner border */}
          <div
            className="absolute inset-0 rounded-3xl border border-orange-500/20 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center">
            {badge && (
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-6">
                <span className="h-px w-6 bg-orange-500 rounded-full" />
                {badge}
              </span>
            )}

            <h2
              id="contact-cta-heading"
              className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight max-w-3xl"
            >
              {heading}
            </h2>

            {description && (
              <p className="text-slate-300 text-sm sm:text-base mb-10 max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={primaryButton.url}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold text-sm hover:bg-orange-600 transition-all duration-200 shadow-lg shadow-orange-900/30 hover:-translate-y-0.5 w-full sm:w-auto"
              >
                {primaryButton.text}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>

              {secondaryButton.text && secondaryButton.url && (
                <Link
                  href={secondaryButton.url}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-semibold text-sm hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  {secondaryButton.text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
