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
    <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col bg-white">
      <div className="mb-10 text-center">
        <h2 className="text-[28px] sm:text-[32px] font-bold text-[#1a233a] mb-4">
          {heading || "Request a Call Back"}
        </h2>
        {/* Orange Accent Line */}
        <div className="h-[2px] w-20 bg-orange-500 mx-auto"></div>
      </div>

      <div className="text-[15px] leading-[1.8] text-slate-600 space-y-6 flex-grow">
        {descriptionParagraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
        {(privacyNote || !description) && (
          <p>
            {privacyNote || "Note: Your details are kept strictly confidential as per our Privacy Policy."}
          </p>
        )}
      </div>
    </div>
  );
}
