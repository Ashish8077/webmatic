"use client";
import Image from "next/image";
import Link from "next/link";

import { HeaderSettings } from "@/modules/site-settings/types/header.types";

interface LogoProps {
  logoSettings?: HeaderSettings["logo"];
}

export function Logo({ logoSettings }: LogoProps) {
  const customSrc = logoSettings?.image?.url || logoSettings?.image?.storagePath;
  const alt = logoSettings?.altText || "Webmatic Technology";

  if (customSrc) {
    return (
      <Link href="/" className="shrink-0 flex items-center">
        <Image
          src={customSrc}
          alt={alt}
          className="h-9 sm:h-10 w-auto object-contain transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          width={465}
          height={146}
          priority
        />
      </Link>
    );
  }

  return (
    <Link href="/" className="shrink-0 flex items-center relative h-10 w-37.5">
      {/* Image for transparent header (at top of page) */}
      <Image
        src="/images/logo2.png"
        alt={alt}
        className="h-9 sm:h-10 w-auto object-contain transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] absolute inset-0 opacity-0 group-[.is-top]/header:opacity-100"
        width={465}
        height={146}
        priority
      />
      {/* Image for solid white header (scrolled) */}
      <Image
        src="/images/webmatic-logo-removebg-preview.png"
        alt={alt}
        className="h-9 sm:h-10 w-auto object-contain transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] absolute inset-0 opacity-100 group-[.is-top]/header:opacity-0"
        width={465}
        height={146}
        priority
      />
    </Link>
  );
}

