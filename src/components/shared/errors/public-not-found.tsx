import Link from "next/link";

export function PublicNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-40 md:pt-45 pb-16 bg-slate-50 relative overflow-hidden">
      {/* Subtle Light Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto animate-fade-in">
        <h1 className="text-8xl md:text-9xl font-bold text-hero-accent mb-6 tracking-tight">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-600 text-lg mb-8 max-w-md">
          The page you are looking for may have been moved, deleted, or never existed.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link 
            href="/"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-hero-primary px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_6px_18px_rgba(10,152,212,0.2)] transition-all duration-200 hover:bg-hero-primary-hover hover:-translate-y-0.5 active:translate-y-0"
          >
            Return Home
          </Link>
          <Link 
            href="/services"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 backdrop-blur-sm px-7 py-3.5 text-[14px] font-semibold text-hero-navy transition-all duration-200 hover:bg-white hover:border-slate-400 hover:-translate-y-0.5 active:translate-y-0"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </main>
  );
}
