export interface ContactContentProps {
  heading?: string;
  description?: string;
  privacyNote?: string;
}

export function ContactContent({ heading, description, privacyNote }: ContactContentProps) {
  const descriptionParagraphs =
    description
      ?.split("\n")
      .filter((paragraph) => paragraph.trim().length > 0) ?? [];

  return (
    <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col bg-white">
      <div className="mb-8 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-[11px] font-bold text-orange-500 uppercase tracking-[0.2em]">
            Get In Touch
          </span>
        </div>
        <h2 className="text-[28px] sm:text-[32px] font-bold text-navy leading-[1.15] mb-3">
          {heading || "Request a Call Back"}
        </h2>
        <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
      </div>

      <div className="text-[15px] leading-[1.7] text-slate-600 space-y-4 flex-grow">
        {descriptionParagraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
        {(privacyNote || !description) && (
          <p className="text-[14px] text-slate-500 italic">
            {privacyNote || "Note: Your details are kept strictly confidential as per our Privacy Policy."}
          </p>
        )}
      </div>
    </div>
  );
}
