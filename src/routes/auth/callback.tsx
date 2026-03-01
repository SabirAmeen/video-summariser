import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

const handleCallback = createServerFn({ method: "GET" }).handler(async () => {
  const request = getRequest();
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const baseUrl = process.env.AZURE_BASE_URL ?? url.origin;

  if (code) {
    // Set the session cookie and redirect to home
    return new Response(null, {
      status: 302,
      headers: {
        Location: `${baseUrl}/home`,
        "Set-Cookie": `session_token=${code}; HttpOnly; ${process.env.NODE_ENV === "production" ? "Secure; " : ""}SameSite=Lax; Path=/; Max-Age=86400`,
      },
    });
  }

  // If no code is present, redirect back to signin
  return new Response(null, {
    status: 302,
    headers: {
      Location: `${baseUrl}/?error=missing_code`,
    },
  });
});

export const Route = createFileRoute("/auth/callback")({
  loader: async () => {
    await handleCallback();
  },
  component: () => <div>Redirecting...</div>,
});
