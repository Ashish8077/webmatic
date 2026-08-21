import { Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaYoutube, FaTwitter } from "react-icons/fa6";
import { HeaderSettings } from "@/modules/site-settings/types/header.types";

const getSocialIcon = (platform: string, className: string) => {
  switch (platform.toLowerCase()) {
    case "facebook": return <FaFacebook className={className} />;
    case "instagram": return <FaInstagram className={className} />;
    case "linkedin": return <FaLinkedinIn className={className} />;
    case "youtube": return <FaYoutube className={className} />;
    case "twitter": return <FaTwitter className={className} />;
    default: return null;
  }
};

const TopHeader = ({ scrolled, settings }: { scrolled: boolean; settings: HeaderSettings }) => {
  return (
    <div
      className={`border-b transition-all duration-500 ${
        scrolled
          ? "bg-slate-900 border-white/10"
          : "bg-transparent border-white/10"
      }`}
    >
      <div className="max-w-292.5 mx-auto px-5 sm:px-8 h-10 flex items-center justify-between">
        {/* Left — contact info */}
        <div className="flex items-center gap-6 text-sm text-slate-300">
          {settings?.visibility?.phone && settings?.contactInfo?.phone?.number && (
            <a
              href={settings.contactInfo.phone.url || `tel:${settings.contactInfo.phone.number}`}
              className="flex items-center gap-2 hover:text-orange-400 transition-colors duration-200"
            >
              <Phone size={14} strokeWidth={1.75} />
              <span className="hidden sm:inline">{settings.contactInfo.phone.number}</span>
            </a>
          )}

          {settings?.visibility?.email && settings?.contactInfo?.email?.address && (
            <a
              href={settings.contactInfo.email.url || `mailto:${settings.contactInfo.email.address}`}
              className="hidden md:flex items-center gap-2 hover:text-orange-400 transition-colors duration-200"
            >
              <Mail size={14} strokeWidth={1.75} />
              <span>{settings.contactInfo.email.address}</span>
            </a>
          )}
        </div>

        {/* Right — nav + social */}
        <div className="flex items-center gap-6 text-sm text-slate-300">
          {/* Nav — hidden on small screens */}
          <nav className="hidden sm:flex items-center gap-5">
            <a
              href="https://www.webmatictechnology.com/blog/"
              className="hover:text-white transition-colors duration-200"
            >
              Blog
            </a>
            <a
              href="https://www.webmatictechnology.com/contact/"
              className="hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
          </nav>

          <span
            className="hidden sm:block w-px h-4 bg-slate-600"
            aria-hidden="true"
          />

          {/* Social icons */}
          {settings?.visibility?.social && (
            <div className="flex items-center gap-3">
              {settings.socialLinks
                ?.filter((s) => s.enabled && s.url)
                .map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.platform}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {getSocialIcon(social.platform, "h-4 w-4")}
                  </a>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
