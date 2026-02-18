import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Branding & Testimonial */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-zinc-900 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 opacity-50 z-0"></div>
        <div className="relative z-10 flex items-center gap-2">
          <div className="h-8 w-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
            <svg
              className="w-5 h-5 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">VideoSummariser</span>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <div className="md:hidden flex justify-center mb-4">
               <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome back
            </h2>
          </div>

          <div className="mt-8 space-y-6">
            <Link
              href={
                `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/authorize?client_id=${process.env.AZURE_CLIENT_ID}&scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.read&response_type=code`
              }
              className="flex w-full items-center justify-center gap-3 rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
