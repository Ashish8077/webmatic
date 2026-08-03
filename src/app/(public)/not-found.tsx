import { PublicNotFound } from "@/components/shared/errors/public-not-found";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  // We do NOT pass withLayout=true here because this file lives inside the (public) route group,
  // which inherently provides the Header and Footer via (public)/layout.tsx!
  return <PublicNotFound />;
}
