
import { FileVideo, LogOut } from "lucide-react";
import { UploadSection } from "@/components/UploadSection";
import { TranscriptSection } from "@/components/TranscriptSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-foreground selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <FileVideo className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-zinc-100">
              VideoSummariser
            </span>
          </div>
          <div className="flex items-center gap-4">
              <a 
                href="/auth/signout"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-red-400 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </a>
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-zinc-400">US</span>
              </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-linear-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent pb-1">
            Summarize Any Video in Seconds
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Upload your video file and let our AI generate a concise summary and transcript instantly.
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Upload Section */}
            <UploadSection />

            {/* Transcript Section */}
            <TranscriptSection />
        </div>
      </main>
    </div>
  );
}
