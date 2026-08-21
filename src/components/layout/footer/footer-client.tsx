"use client";

import Link from "next/link";
import { Phone, Send, ArrowRight } from "lucide-react";
import { FooterSettings } from "@/modules/site-settings/types/footer.types";
import { MenuNode } from "@/modules/menus/types/menu.types";


interface FooterClientProps {
  settings: FooterSettings;
  navLinks: MenuNode[];
}

/* Dark navy — readable on sky blue */
const dark = "text-[#0c2340]";
const muted = "text-[#0c2340]/85"; // Increased opacity for better UI/UX accessibility contrast
const divider = "border-[#0c2340]/20";

export function FooterClient({ settings, navLinks }: FooterClientProps) {
  return (
    <footer className="bg-[#6EC1E4]">

      {/* ── Main footer ───────────────────────────────────── */}
      <div className="mx-auto max-w-292.5 px-5 sm:px-8 py-14 sm:py-18">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Left — CTA */}
          <div>
            <h2
              className={`text-3xl sm:text-4xl font-bold leading-tight ${dark}`}
            >
              {settings.heroCta.heading}{" "}
              <span className="text-orange-500">
                {settings.heroCta.highlightedText}
              </span>
            </h2>
            <p className={`mt-4 text-base leading-relaxed ${muted} max-w-sm`}>
              {settings.heroCta.description}
            </p>
            {settings.heroCta.buttonUrl && (
              <Link
                href={settings.heroCta.buttonUrl}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0c2340] px-7 py-3 text-sm font-semibold text-white hover:bg-[#0c2340]/80 transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
              >
                {settings.heroCta.buttonText}
                <ArrowRight size={14} />
              </Link>
            )}
          </div>

          {/* Right — nav + contact */}
          <div className="flex flex-col gap-10">
            {/* Nav links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  target={link.target === "_blank" ? "_blank" : undefined}
                  rel={link.rel || undefined}
                  className={`text-base ${muted} hover:${dark} hover:font-semibold transition-all duration-200`}
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <div className={`border-t ${divider}`} />

            {/* Contact info */}
            <div className="grid gap-8 sm:grid-cols-2">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0c2340]/10 text-[#0c2340]">
                  <Phone size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className={`text-base font-bold ${dark}`}>
                    {settings.contactInfo.phone.title}
                  </h4>
                  {settings.contactInfo.phone.phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.number}`}
                      className={`block mt-1.5 text-base ${muted} hover:${dark} transition-colors`}
                    >
                      {phone.label} {phone.number}
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0c2340]/10 text-[#0c2340]">
                  <Send size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className={`text-base font-bold ${dark}`}>
                    {settings.contactInfo.email.title}
                  </h4>
                  <p className={`mt-1.5 text-base ${muted}`}>
                    {settings.contactInfo.email.subtitle}
                  </p>
                  <a
                    href={`mailto:${settings.contactInfo.email.email}`}
                    className={`block text-base ${muted} hover:${dark} transition-colors`}
                  >
                    {settings.contactInfo.email.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────── */}
      <div className={`border-t ${divider}`}>
        <div className="mx-auto max-w-292.5 px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-sm ${muted}`}>
            Copyright ©{" "}
            {settings.copyright.autoYear ? new Date().getFullYear() : ""}{" "}
            {settings.copyright.companyName}
          </p>
          <div className="flex items-center gap-3">
            {settings.socialLinks
              .filter((s) => s.enabled)
              .map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.platform}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0c2340]/10 text-[#0c2340]/60 hover:bg-[#0c2340] hover:text-white transition-all duration-200"
                >
                  {/* Inline SVGs for Facebook, Instagram, LinkedIn */}
                  {social.platform.toLowerCase() === "facebook" && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  )}
                  {social.platform.toLowerCase() === "instagram" && (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )}
                  {social.platform.toLowerCase() === "linkedin" && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  )}
                </a>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
