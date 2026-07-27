import { VisualRenderer } from "@/components/ui/visual-renderer";
import { type TeamMembersContentValues } from "@/features/page-sections/schemas/team-members.schema";

interface Props {
  content: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

export function TeamMembersSection({ content }: Props) {
  const data = content as unknown as TeamMembersContentValues;

  const members = [...(data.members || [])].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  );

  if (members.length === 0) return null;

  return (
    <section className="relative bg-slate-50 py-24 lg:py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1170px] px-5 sm:px-8">
        {/* ── Section header ──────────────────────────────── */}
        <div className="mb-16 lg:mb-20 text-center flex flex-col items-center">
          {data.badge && (
            <span className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-orange-100 text-[12px] font-bold uppercase tracking-[0.2em] text-orange-600 mb-6 shadow-sm">
              <span className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-pulse" />
              {data.badge}
            </span>
          )}
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.15] text-navy tracking-tight">
            {data.heading}
          </h2>
          {data.description && (
            <p className="mt-4 text-[16px] lg:text-[18px] leading-[1.7] text-slate-500 max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        {/* ── Team grid ───────────────────────────────────── */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => {
            return (
              <div
                key={index}
                className="group relative rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex flex-col"
              >
                {/* Profile image */}
                <div className="relative w-full aspect-[4/5] bg-slate-100 overflow-hidden">
                  {member.visualType === "none" && !member.imageId ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-50 group-hover:bg-slate-100 transition-colors duration-500">
                      <div className="w-20 h-20 text-slate-300 group-hover:text-slate-400 transition-colors duration-500 rounded-full border-2 border-current flex items-center justify-center">
                         {/* Fallback default icon */}
                         <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </div>
                    </div>
                  ) : (
                    <VisualRenderer
                      asset={member}
                      className="absolute inset-0"
                      imageClassName="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      iconClassName="w-20 h-20 text-slate-400 transition-colors duration-500"
                      alt={member.name}
                    />
                  )}
                  {/* Subtle overlay gradient on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Info */}
                <div className="p-8 text-center flex-grow flex flex-col justify-center relative bg-white transition-all duration-500">
                  {/* Top accent line on card info */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-orange-500 rounded-b-full transition-all duration-500 group-hover:w-24 group-hover:bg-hero-primary" />
                  
                  <h3 className="text-xl font-bold text-navy group-hover:text-hero-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-[14px] font-semibold text-orange-500 uppercase tracking-wide">
                    {member.designation}
                  </p>
                  {member.description && (
                    <p className="mt-4 text-[14px] leading-[1.7] text-slate-500 line-clamp-3">
                      {member.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
