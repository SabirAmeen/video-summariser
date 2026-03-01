import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const handleSignout = createServerFn({ method: "GET" }).handler(async () => {
  const baseUrl = process.env.AZURE_BASE_URL ?? "http://localhost:3000";

  // Delete the session cookie by setting Max-Age=0 and redirect to login
  return new Response(null, {
    status: 302,
    headers: {
      Location: `${baseUrl}/`,
      "Set-Cookie": `session_token=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`,
    },
  });
});

export const Route = createFileRoute("/auth/signout")({
  loader: async () => {
    await handleSignout();
  },
  component: () => <div>Signing out...</div>,
});
