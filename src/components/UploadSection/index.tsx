"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle, Loader2 } from "lucide-react";

export function UploadSection({
    setVideoId,
}: {
    setVideoId: (id: string) => void;
}) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadStatus(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Upload failed");
            }
            const responseObj = await response.json();
            setVideoId(responseObj.data.blobName);
            setUploadStatus("Upload successful!");
        } catch (error) {
            setUploadStatus(
                error instanceof Error
                    ? error.message
                    : "An error occurred during upload"
            );
        } finally {
            setIsUploading(false);
            e.target.value = ""; // Reset input so it can be re-selected
        }
    };
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                    <UploadCloud className="w-5 h-5 text-indigo-400" />
                    Upload Video
                </h2>
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Step 1</span>
            </div>
            
            <label 
                className="group relative mt-2 flex justify-center rounded-2xl border-2 border-dashed border-zinc-800 px-6 py-16 transition-all duration-300 hover:border-indigo-500/50 hover:bg-zinc-900/50 cursor-pointer"
            >
                <input 
                    type="file" 
                    className="hidden" 
                    accept="video/mp4,video/quicktime,video/x-msvideo"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                />
                <div className="text-center space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 group-hover:bg-indigo-500/10 transition-colors duration-300 border border-zinc-800 group-hover:border-indigo-500/20">
                        {isUploading ? (
                            <Loader2 className="h-8 w-8 text-indigo-400 animate-spin" aria-hidden="true" />
                        ) : (
                            <UploadCloud className="h-8 w-8 text-zinc-400 group-hover:text-indigo-400 transition-colors duration-300" aria-hidden="true" />
                        )}
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-zinc-300">
                            {isUploading ? (
                                <span className="text-indigo-400">Uploading video...</span>
                            ) : (
                                <><span className="text-indigo-400 hover:underline">Click to upload</span> or drag and drop</>
                            )}
                        </p>
                        <p className="text-xs text-zinc-500">
                            MP4, MOV, or AVI (max. 50MB)
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
            </label>

            {uploadStatus && (
                <div className={`text-sm text-center font-medium ${uploadStatus.includes("successful") ? "text-emerald-500" : "text-rose-500"}`}>
                    {uploadStatus}
                </div>
            )}
        </div>
    );
}
