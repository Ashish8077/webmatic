import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_ROUTES } from "@/modules/auth/constants/routes";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for the presence of the session cookie
  // Note: This acts as session detection for UI protection.
  // Strict JWT signature verification happens at the API level via requireAuth().
  const hasSession = request.cookies.has("accessToken");

  // Automatically redirect the root /admin path to the dashboard to prevent 404s
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL(AUTH_ROUTES.DASHBOARD, request.url));
  }

  // 1. If the user is authenticated and tries to access the login page, redirect to dashboard.
  if (hasSession && pathname === AUTH_ROUTES.LOGIN) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.DASHBOARD, request.url));
  }

  // 2. If the route is an admin route, enforce authentication.
  if (pathname.startsWith("/admin")) {
    if (!hasSession && pathname !== AUTH_ROUTES.LOGIN) {
      const redirectUrl = new URL(AUTH_ROUTES.LOGIN, request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 3. For all other routes (public pages), allow access.
  return NextResponse.next();
}

// Config matcher to avoid running middleware on static assets, images, API routes, and Next.js internals
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes - protected separately)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt
     * - sitemap.xml
     * - fonts, images, public assets (e.g. .png, .jpg, .svg)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
