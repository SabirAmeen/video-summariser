import { FileText } from "lucide-react";
import * as signalR from "@microsoft/signalr";
import { useEffect, useRef } from "react";

export function TranscriptSection({ videoId }: { videoId: string | null }) {
  const signalConnection = useRef<signalR.HubConnection | null>(null);
  useEffect(() => {
    let connection: signalR.HubConnection | null = null;
    if (videoId) {
      connection = new signalR.HubConnectionBuilder()
        .withUrl(
          import.meta.env.VITE_AZURE_SIGNAL_NEGOTIATE_URL ?? "",
          videoId
            ? {
                headers: {
                  "x-ms-client-principal-id": videoId,
                },
              }
            : {},
        )
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();
      signalConnection.current = connection;
    }

    async function start() {
      try {
        await connection?.start();
        console.log("SignalR Connected.");
      } catch (err) {
        console.error("SignalR Connection Error: ", err);
        setTimeout(start, 5000);
      }
    }
    if (connection) start();
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

  useEffect(() => {
    signalConnection.current?.on("newMessage", (data) => {
      console.log(data);
    });
  }, [signalConnection.current]);

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
