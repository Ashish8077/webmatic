
import { Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const TopHeader = ({ scrolled }: { scrolled: boolean }) => {
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
          <a
            href="tel:+919289351703"
            className="flex items-center gap-2 hover:text-orange-400 transition-colors duration-200"
          >
            <Phone size={14} strokeWidth={1.75} />
            <span className="hidden sm:inline">+91-9289351703</span>
          </a>

          <a
            href="mailto:info@webmatictechnology.com"
            className="hidden md:flex items-center gap-2 hover:text-orange-400 transition-colors duration-200"
          >
            <Mail size={14} strokeWidth={1.75} />
            <span>info@webmatictechnology.com</span>
          </a>
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
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/webmatictechnologyofficial"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-white transition-colors duration-200"
            >
              <FaFacebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/webmatictechnology/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors duration-200"
            >
              <FaInstagram size={13} />
            </a>
            <a
              href="https://www.linkedin.com/company/webmatic-technology-ltd"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors duration-200"
            >
              <FaLinkedinIn size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
