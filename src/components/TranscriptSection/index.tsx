import { FileText } from "lucide-react";
import * as signalR from "@microsoft/signalr";
import { useEffect } from "react";

export function TranscriptSection({ videoId }: { videoId: string | null }) {
  useEffect(() => {
    let connection: signalR.HubConnection | null = null;
    if (videoId) {
      connection = new signalR.HubConnectionBuilder()
        // Point to your Function App's base API route (e.g., http://localhost:7071/api)
        // The SDK automatically appends /negotiate to this URL.
        .withUrl(
          process.env.NEXT_PUBLIC_AZURE_SIGNAL_NEGOTIATE_URL ?? "",
          videoId
            ? {
                headers: {
                  // This header name must match the one in your function.json
                  // e.g., {headers.x-ms-client-principal-id}
                  "x-ms-client-principal-id": videoId,
                },
              }
            : {},
        )
        .withAutomaticReconnect() // Optional: auto-reconnect on drop
        .configureLogging(signalR.LogLevel.Information)
        .build();
    }

    async function start() {
      try {
        await connection?.start();
        console.log("SignalR Connected.");
      } catch (err) {
        console.error("SignalR Connection Error: ", err);
        setTimeout(start, 5000); // Retry on failure
      }
    }
    if (connection) {
      connection.on("newMessage", (data) => {
        console.log(data, "newMessage");
      });
      connection.on("newmessage", (data) => {
        console.log(data, "newmessage");
      });
      start();
    }
    return () => {
      async function disconnect() {
        try {
          await connection?.stop();
          console.log("SignalR Connection closed.");
        } catch (err) {
          console.error("Error while closing connection: ", err);
        }
      }
      if (connection) disconnect();
    };
  }, [videoId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          Transcript
        </h2>
        <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
          Step 2
        </span>
      </div>

      <div className="h-[400px] w-full rounded-2xl border border-zinc-800 bg-zinc-900/30 p-1">
        <div className="h-full w-full rounded-xl bg-zinc-950/50 border border-white/5 p-6 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
            <FileText className="w-12 h-12 text-zinc-700" />
            <p className="text-zinc-500 text-sm">
              Transcript will appear here after processing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
