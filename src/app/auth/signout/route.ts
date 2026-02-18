import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  // Delete the session cookie
  (await cookies()).delete("session_token");

  // Redirect to the sign-in page
  return NextResponse.redirect(new URL("/", request.url));
}
