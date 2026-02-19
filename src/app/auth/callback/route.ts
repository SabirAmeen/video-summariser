import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const baseUrl = process.env.AZURE_BASE_URL ?? request.url;

  if (code) {
    // In a real app, we would exchange this code for an access token here.
    // For this simple example, we'll store the code in a cookie to simulate a session.

    // Set the cookie
    (await cookies()).set("session_token", code, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // Redirect to home page
    return NextResponse.redirect(new URL("/home", baseUrl));
  }

  // If no code is present, redirect back to signin or show error
  return NextResponse.redirect(
    new URL("/auth/signin?error=missing_code", baseUrl),
  );
}
