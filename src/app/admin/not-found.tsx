import { AdminNotFound } from "@/components/shared/errors/admin-not-found";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Admin Page Not Found",
};

export default function NotFound() {
  // This handles 404s thrown explicitly inside the admin area.
  // It does NOT inherit the public layout because it's inside the admin directory.
  // It WILL inherit admin/(protected)/layout.tsx IF it is placed inside (protected),
  // but since we placed it at admin/not-found.tsx, it might inherit admin/layout.tsx if it exists.
  // We removed admin/layout.tsx earlier, so it is fully standalone.
  return <AdminNotFound />;
}
