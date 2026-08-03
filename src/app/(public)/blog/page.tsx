import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Coming Soon | Webmatic Technology",
  description: "Our blog is currently under construction. Stay tuned for insightful articles, news, and updates!",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-[160px] md:pt-[180px] pb-16 bg-slate-50 relative overflow-hidden">
      {/* Subtle Light Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-hero-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-hero-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto animate-fade-in">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-hero-accent/20 bg-white/80 backdrop-blur-md px-4 py-2 text-sm font-semibold tracking-wide text-hero-accent shadow-sm animate-slide-up">
          <span className="h-2 w-2 rounded-full bg-hero-accent animate-pulse" />
          <span>Under Construction</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-hero-navy mb-6 tracking-tight animate-slide-up" style={{ animationDelay: "100ms" }}>
          Our Blog is <span className="text-hero-accent">Coming Soon</span>
        </h1>
        
        <p className="text-slate-500 text-lg mb-10 max-w-lg leading-relaxed animate-slide-up" style={{ animationDelay: "200ms" }}>
          We&apos;re working hard to bring you amazing content. Check back shortly for insightful articles, company news, and industry updates!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center animate-slide-up" style={{ animationDelay: "300ms" }}>
          <Link 
            href="/"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-hero-primary px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_6px_18px_rgba(10,152,212,0.2)] transition-all duration-200 hover:bg-hero-primary-hover hover:-translate-y-0.5 active:translate-y-0"
          >
            Return Home
          </Link>
          <Link 
            href="/contact"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 backdrop-blur-sm px-7 py-3.5 text-[14px] font-semibold text-hero-navy transition-all duration-200 hover:bg-white hover:border-slate-400 hover:-translate-y-0.5 active:translate-y-0"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}