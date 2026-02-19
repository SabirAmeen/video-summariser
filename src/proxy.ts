import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("session_token");

  // If the user attempts to access /home without a session token, redirect to login
  if (!sessionToken && request.nextUrl.pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*"],
};
