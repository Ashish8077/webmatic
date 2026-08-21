import { VisualRenderer } from "@/components/ui/visual-renderer";
import { getMediaUrl } from "@/features/media/utils/media-url";
import { type TeamMembersContentValues } from "@/features/page-sections/schemas/team-members.schema";
import type { Media } from "@/features/media/types";
import type { VisualAsset } from "@/shared/types/visual-asset.types";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface Props {
  content: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

type HydratedTeamMember = TeamMembersContentValues["members"][number] & {
  image?: Media | null;
};

export function TeamMembersSection({ content }: Props) {
  const data = content as unknown as TeamMembersContentValues;

  const members = ([...(data.members || [])] as HydratedTeamMember[]).sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  );

  if (members.length === 0) return null;

  return (
    <section className="relative bg-slate-50 py-16 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-292.5 px-5 sm:px-8">
        {/* ── Section header ──────────────────────────────── */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 text-center flex flex-col items-center">
            {data.badge && (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-orange-100 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-600 mb-4 shadow-sm">
                <span className="h-1 w-1 bg-orange-500 rounded-full animate-pulse" />
                {data.badge}
              </span>
            )}
            <h2 className="text-[28px] sm:text-[32px] font-bold leading-[1.2] text-navy tracking-tight">
              {data.heading}
            </h2>
            {data.description && (
              <p className="mt-3 text-[15px] leading-[1.6] text-slate-500 max-w-2xl mx-auto">
                {data.description}
              </p>
            )}
          </div>
        </ScrollReveal>

        {/* ── Team grid ───────────────────────────────────── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => {
            const profileImageUrl = getMediaUrl(member.image);
            const profileVisual = profileImageUrl && member.image
              ? ({
                  ...member,
                  visualType: "image",
                  iconName: null,
                  imageId: member.imageId ?? member.image.id,
                  image: member.image,
                } satisfies VisualAsset)
              : null;

            return (
              <ScrollReveal key={index} delay={index * 0.15} direction="up" className="h-full">
                <div className="group relative rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
                  {/* Profile image - Changed to aspect-square so it's not massively tall */}
                  <div className="relative w-full aspect-square bg-slate-100 overflow-hidden shrink-0">
                    {profileVisual ? (
                      <VisualRenderer
                        asset={profileVisual}
                        className="absolute inset-0"
                        imageClassName="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        iconClassName="w-14 h-14 text-slate-400 transition-colors duration-200"
                        alt={member.name}
                      />
                    ) : null}
                    {/* Subtle overlay gradient on image */}
                    <div className="absolute inset-0 bg-linear-to-t from-navy/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Info */}
                  <div className="p-6 text-center grow flex flex-col items-center bg-white">
                    <h3 className="text-lg font-bold text-navy group-hover:text-orange-500 transition-colors duration-200 leading-tight">
                      {member.name}
                    </h3>
                    <p className="mt-1.5 text-xs font-bold text-hero-primary uppercase tracking-wider">
                      {member.designation}
                    </p>
                    {member.description && (
                      <p className="mt-4 text-[14px] leading-relaxed text-slate-500 w-full">
                        {member.description}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
