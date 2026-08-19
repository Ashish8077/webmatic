"use client";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="shrink-0 flex items-center">
      <Image
        src="/images/webmatic-logo-removebg-preview.png"
        alt="Webmatic Technology"
        className="h-9 sm:h-10 w-auto object-contain transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
        width={465}
        height={146}
        priority
      />
    </Link>
  );
}

