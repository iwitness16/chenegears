import { NextResponse } from "next/server";

const ADMIN_COOKIE = "chene_admin_auth";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only guard /admin routes (not /admin/login itself)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const auth = request.cookies.get(ADMIN_COOKIE);
    if (!auth || auth.value !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
