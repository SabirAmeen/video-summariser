import { useState } from "react";
import { UploadSection } from "~/components/UploadSection";
import { TranscriptSection } from "~/components/TranscriptSection";

export function Workspace() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [videoSummary, setVideoSummary] = useState<string>("");

  const onVideoUpload = () => {
    setSummaryLoading(true);
    setVideoSummary("");
  };

  const onSummaryReceived = (summary: string) => {
    setVideoSummary(summary);
    setSummaryLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Upload Section */}
      <UploadSection setVideoId={setVideoId} onUpload={onVideoUpload} />

      {/* Transcript Section */}
      <TranscriptSection
        videoId={videoId}
        summaryLoading={summaryLoading}
        videoSummary={videoSummary}
        onSummaryReceived={onSummaryReceived}
      />
    </div>
  );
}
