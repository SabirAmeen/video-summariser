import { FileText } from "lucide-react";

export function TranscriptSection() {
    return (
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
    );
}
