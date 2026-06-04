import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "admin_token";
const ADMIN_SECRET = process.env.ADMIN_PASSWORD ?? "";

// proxy.ts is the new name for middleware.ts in Next.js 16+
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard /admin routes (not /admin/login or /api/admin/login)
  const isAdminPage = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname.startsWith("/api/admin/login");

  if (!isAdminPage || isLoginPage || isLoginApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  // Valid token = the ADMIN_PASSWORD value itself (simple, no crypto needed for MVP)
  if (token && ADMIN_SECRET && token === ADMIN_SECRET) {
    return NextResponse.next();
  }

  // Redirect unauthenticated requests to login
  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
