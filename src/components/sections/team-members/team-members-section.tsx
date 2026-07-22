import Image from "next/image";
import { User } from "lucide-react";
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
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        {/* ── Section header ──────────────────────────────── */}
        <div className="mb-14 text-center">
          {data.badge && (
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-4">
              <span className="h-px w-8 bg-orange-500 rounded-full" />
              {data.badge}
            </span>
          )}
          <h2 className="text-[30px] lg:text-[36px] font-bold leading-[1.15] text-navy">
            {data.heading}
          </h2>
          {data.description && (
            <p className="mt-3 text-[16px] leading-[1.625] text-slate-500 max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        {/* ── Team grid ───────────────────────────────────── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => {
            const imageUrl = member.imageId
              ? `/api/media/${member.imageId}`
              : null;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Profile image */}
                <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <User
                        className="w-16 h-16 text-slate-300"
                        strokeWidth={1}
                      />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-base font-semibold text-navy">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium text-orange-500">
                    {member.designation}
                  </p>
                  {member.description && (
                    <p className="mt-3 text-[13px] leading-relaxed text-slate-500 line-clamp-3">
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
