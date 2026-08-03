import { NextResponse } from "next/server";
import { siteSettingsService } from "@/modules/site-settings/services/site-settings.service";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";

export async function GET() {
  try {
    const user = await requireAuth();
    
    // We can reuse the CAN_READ_MENUS permission for now or add a CAN_MANAGE_SETTINGS permission later.
    // For this migration, we check if they are logged in and have admin access.
    if (!user || (!user.roles.includes("super-admin") && !user.roles.includes("admin"))) { 
       // If you have a specific permission for settings, use it. For now, admin is safe.
       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const settings = await siteSettingsService.getFooterSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("[Footer Settings GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireAuth();
    
    if (!user || (!user.roles.includes("super-admin") && !user.roles.includes("admin"))) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    await siteSettingsService.updateFooterSettings(body, user.userId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[Footer Settings PUT]", error);
    if (error.name === "ZodError") {
      return new NextResponse("Invalid data", { status: 422 });
    }
    return new NextResponse("Internal error", { status: 500 });
  }
}
