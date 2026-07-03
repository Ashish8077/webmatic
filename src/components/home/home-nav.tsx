/**
 * Sticky glass navigation bar for the public home page.
 *
 * Links are hardcoded to the section IDs defined in each section component.
 * Hidden on very small viewports — mobile users rely on scroll.
 */
export function HomeNav({ siteTitle }: { siteTitle: string }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-card-border/50">
      <nav
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
      >
        {/* Logo / site name */}
        <a
          href="#hero"
          className="text-base font-bold gradient-text hover:opacity-80 transition-opacity"
        >
          {siteTitle}
        </a>

        {/* Navigation links — hidden on mobile */}
        <ul
          className="hidden sm:flex items-center gap-1"
          role="list"
        >
          {(
            [
              { label: "About", href: "#about" },
              { label: "Services", href: "#services" },
              { label: "Why Us", href: "#why-us" },
              { label: "FAQ", href: "#faq" },
            ] as const
          ).map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all duration-150"
              >
                {label}
              </a>
            </li>
          ))}

          <li>
            <a
              href="#contact-cta"
              className="ml-2 px-5 py-2 rounded-lg text-xs font-semibold bg-accent text-white hover:bg-accent-hover transition-colors duration-150"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
