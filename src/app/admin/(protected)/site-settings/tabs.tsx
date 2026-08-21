"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const tabs = [
  { name: "Header", href: "/admin/site-settings/header" },
  { name: "Footer", href: "/admin/site-settings/footer" },
  { name: "Contact", href: "/admin/site-settings/contact" },
  { name: "SEO & Social", href: "/admin/site-settings/seo", disabled: true },
  { name: "Company", href: "/admin/site-settings/company", disabled: true },
];

export function SiteSettingsTabs() {
  const pathname = usePathname();

  return (
    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        if (tab.disabled) {
          return (
            <span
              key={tab.name}
              className="whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed"
            >
              {tab.name} (Coming Soon)
            </span>
          );
        }

        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={clsx(
              "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors",
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
            )}
          >
            {tab.name}
          </Link>
        );
      })}
    </nav>
  );
}
