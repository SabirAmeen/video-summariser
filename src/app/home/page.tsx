
import { UploadCloud, FileVideo, CheckCircle, FileText, LogOut } from "lucide-react";

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
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                        <UploadCloud className="w-5 h-5 text-indigo-400" />
                        Upload Video
                    </h2>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Step 1</span>
                </div>
                
                <div className="group relative mt-2 flex justify-center rounded-2xl border-2 border-dashed border-zinc-800 px-6 py-16 transition-all duration-300 hover:border-indigo-500/50 hover:bg-zinc-900/50">
                    <div className="text-center space-y-4">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 group-hover:bg-indigo-500/10 transition-colors duration-300 border border-zinc-800 group-hover:border-indigo-500/20">
                            <UploadCloud className="h-8 w-8 text-zinc-400 group-hover:text-indigo-400 transition-colors duration-300" aria-hidden="true" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-zinc-300">
                                <span className="text-indigo-400 cursor-pointer hover:underline">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-zinc-500">
                                MP4, MOV, or AVI (max. 500MB)
                            </p>
                        </div>
                        
                        <div className="pt-4 flex items-center justify-center gap-4 text-xs text-zinc-500">
                            <div className="flex items-center gap-1.5">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500/80" />
                                <span>Secure</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500/80" />
                                <span>Fast Processing</span>
                            </div>
                        </div>
                    </div>
                    {/* Decorative gradient blob */}
                    <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-lg -z-10" />
                </div>
            </div>

            {/* Transcript Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                     <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-indigo-400" />
                        Transcript
                    </h2>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Step 2</span>
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
        </div>
      </main>
    </div>
  );
}
