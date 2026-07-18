"use client";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <Image
        src="/images/webmatic-logo.png"
        alt="WebMatic Technology"
        className="h-10 w-auto object-contain"
        width={160}
        height={40}
      />
    </Link>
  );
}
