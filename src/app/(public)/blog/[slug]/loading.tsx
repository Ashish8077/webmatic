export default function BlogDetailLoading() {
  return (
    <main className="bg-white min-h-screen pt-26">
      <div className="mx-auto max-w-292.5 px-5 sm:px-8 py-12 lg:py-16">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-12 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-4 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-10 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-4 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
        </div>

        {/* Category badge skeleton */}
        <div className="h-4 w-28 bg-orange-100 rounded mb-4 animate-pulse" />

        {/* Title skeleton */}
        <div className="space-y-3 mb-6">
          <div className="h-10 w-full max-w-2xl bg-slate-200 rounded animate-pulse" />
          <div className="h-10 w-3/4 max-w-xl bg-slate-200 rounded animate-pulse" />
        </div>

        {/* Excerpt skeleton */}
        <div className="h-5 w-full max-w-3xl bg-slate-100 rounded mb-6 animate-pulse" />

        {/* Meta row skeleton */}
        <div className="flex items-center gap-5 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
        </div>

        {/* Featured image skeleton */}
        <div className="w-full aspect-[16/7] rounded-2xl bg-slate-200 animate-pulse" />
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-212.5 px-5 sm:px-8 py-12 lg:py-16">
        <div className="space-y-4">
          <div className="h-5 w-full bg-slate-100 rounded animate-pulse" />
          <div className="h-5 w-11/12 bg-slate-100 rounded animate-pulse" />
          <div className="h-5 w-full bg-slate-100 rounded animate-pulse" />
          <div className="h-5 w-4/5 bg-slate-100 rounded animate-pulse" />
          <div className="h-8 w-1/3 bg-slate-200 rounded animate-pulse mt-8" />
          <div className="h-5 w-full bg-slate-100 rounded animate-pulse" />
          <div className="h-5 w-10/12 bg-slate-100 rounded animate-pulse" />
          <div className="h-5 w-full bg-slate-100 rounded animate-pulse" />
          <div className="h-5 w-3/4 bg-slate-100 rounded animate-pulse" />
        </div>
      </div>
    </main>
  );
}
