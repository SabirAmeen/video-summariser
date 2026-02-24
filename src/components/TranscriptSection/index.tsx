import { FileText, Loader2 } from "lucide-react";
import * as signalR from "@microsoft/signalr";
import { useEffect } from "react";

const formatTranscript = (summary: string) => {
  const normalized = summary.replace(/\\n/g, "\n");
  const [intro, ...restBlocks] = normalized
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  const timelineLines = restBlocks
    .join("\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const timelineItems = timelineLines.map((line, index) => {
    const match = line.match(/^[-*]\s*\*\*(.+?)\*\*:\s*(.+)$/);
    if (!match) {
      return {
        key: `line-${index}`,
        time: null,
        text: line.replace(/^[-*]\s*/, ""),
      };
    }

    return {
      key: `time-${index}`,
      time: match[1],
      text: match[2],
    };
  });

  return { intro, timelineItems };
};

export function TranscriptSection({
  videoId,
  summaryLoading,
  videoSummary,
  onSummaryReceived,
}: {
  videoId: string | null;
  summaryLoading: boolean;
  videoSummary: string;
  onSummaryReceived: (summary: string) => void;
}) {
  const startSignalRConnection = async (connection: signalR.HubConnection) => {
    try {
      await connection?.start();
      console.log("SignalR Connected.");
    } catch (err) {
      console.error("SignalR Connection Error: ", err);
      setTimeout(() => startSignalRConnection(connection), 5000); // Retry on failure
    }
  };

  const disconnectSignalR = async (connection: signalR.HubConnection) => {
    try {
      await connection?.stop();
      console.log("SignalR Connection closed.");
    } catch (err) {
      console.error("Error while closing connection: ", err);
    }
  };

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
    if (connection) {
      connection.on("newMessage", (data) => {
        onSummaryReceived(data?.transcript ?? "");
      });
      startSignalRConnection(connection);
    }
    return () => {
      if (connection) disconnectSignalR(connection);
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
          {summaryLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
              <Loader2 className="w-12 h-12 text-indigo-400 animate-spin" />
              <p className="text-zinc-400 text-sm">Processing transcript...</p>
            </div>
          ) : videoSummary ? (
            <div className="space-y-4 text-sm text-zinc-200">
              {(() => {
                const { intro, timelineItems } = formatTranscript(videoSummary);
                return (
                  <>
                    {intro ? (
                      <p className="text-zinc-300 leading-relaxed">{intro}</p>
                    ) : null}
                    {timelineItems.length ? (
                      <ul className="space-y-3">
                        {timelineItems.map((item) => (
                          <li
                            key={item.key}
                            className="flex flex-col gap-1 rounded-lg border border-white/5 bg-zinc-900/40 p-3"
                          >
                            {item.time ? (
                              <span className="text-xs font-semibold uppercase tracking-wide text-indigo-300">
                                {item.time}
                              </span>
                            ) : null}
                            <span className="text-zinc-200 leading-relaxed">
                              {item.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
              <FileText className="w-12 h-12 text-zinc-700" />
              <p className="text-zinc-500 text-sm">
                {videoSummary || "Transcript will appear here after processing"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
