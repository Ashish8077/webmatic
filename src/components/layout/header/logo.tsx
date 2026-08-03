"use client";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <Image
        src="/images/webmatic-logo.png"
        alt="WebMatic Technology"
        className="object-contain w-auto h-auto"
        width={160}
        height={40}
      />
    </Link>
  );
}
