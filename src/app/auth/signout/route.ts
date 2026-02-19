import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const baseUrl = process.env.AZURE_BASE_URL ?? request.url;
  // Delete the session cookie
  (await cookies()).delete("session_token");

  // Redirect to the sign-in page
  return NextResponse.redirect(new URL("/", baseUrl));
}
