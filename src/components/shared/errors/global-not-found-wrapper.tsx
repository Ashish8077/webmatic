"use client";

import { usePathname } from "next/navigation";

interface GlobalNotFoundWrapperProps {
  adminUI: React.ReactNode;
  publicUI: React.ReactNode;
}

export function GlobalNotFoundWrapper({ adminUI, publicUI }: GlobalNotFoundWrapperProps) {
  const pathname = usePathname();

  // If the unmatched route was under the admin area, show the clean admin 404
  if (pathname?.startsWith("/admin")) {
    return adminUI;
  }

  // Otherwise, return the public UI, which was constructed securely on the server
  return publicUI;
}
