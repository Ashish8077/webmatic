import { redirect } from "next/navigation";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { AUTH_ROUTES } from "@/modules/auth/constants/routes";
import Link from "next/link";

export default async function SiteSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user;
  try {
    user = await requireAuth();
  } catch {
    redirect(AUTH_ROUTES.LOGIN);
  }
  
  if (!user || (!user.roles.includes("super-admin") && !user.roles.includes("admin"))) {
    redirect(AUTH_ROUTES.LOGIN);
  }

  const tabs = [
    { name: "Footer", href: "/admin/site-settings/footer" },
    { name: "Contact", href: "/admin/site-settings/contact" },
    { name: "Header", href: "/admin/site-settings/header", disabled: true },
    { name: "SEO & Social", href: "/admin/site-settings/seo", disabled: true },
    { name: "Company", href: "/admin/site-settings/company", disabled: true },
  ];

  return (
    <div className="flex-1 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage global site configuration and layout elements.
          </p>
        </div>

        <div className="border-b border-border">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              tab.disabled ? (
                 <span
                  key={tab.name}
                  className="whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed"
                >
                  {tab.name} (Coming Soon)
                </span>
              ) : (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className="whitespace-nowrap border-b-2 border-primary py-4 px-1 text-sm font-medium text-primary"
                >
                  {tab.name}
                </Link>
              )
            ))}
          </nav>
        </div>

        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}
