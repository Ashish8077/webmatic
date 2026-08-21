import { redirect } from "next/navigation";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { AUTH_ROUTES } from "@/modules/auth/constants/routes";
import { SiteSettingsTabs } from "./tabs";

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
          <SiteSettingsTabs />
        </div>

        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}
