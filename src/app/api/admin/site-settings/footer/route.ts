import { NextResponse } from "next/server";
import { siteSettingsService } from "@/modules/site-settings/services/site-settings.service";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";

export async function GET() {
  try {
    const user = await requireAuth();
    
    const settings = await siteSettingsService.getFooterSettings(user);
    return NextResponse.json(settings);
  } catch (error) {
    console.error("[Footer Settings GET]", error);
    if (error && typeof error === "object" && "name" in error && error.name === "ZodError") {
      return new NextResponse("Invalid data", { status: 422 });
    }
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireAuth();
    
    const body = await request.json();
    await siteSettingsService.updateFooterSettings(body, user);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Footer Settings PUT]", error);
    if (error && typeof error === "object" && "name" in error && error.name === "ZodError") {
      return new NextResponse("Invalid data", { status: 422 });
    }
    return new NextResponse("Internal error", { status: 500 });
  }
}
