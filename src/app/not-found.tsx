import { GlobalNotFoundWrapper } from "@/components/shared/errors/global-not-found-wrapper";
import { PublicNotFound } from "@/components/shared/errors/public-not-found";
import { AdminNotFound } from "@/components/shared/errors/admin-not-found";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
};

export default function GlobalNotFound() {
  return (
    <GlobalNotFoundWrapper
      adminUI={<AdminNotFound />}
      publicUI={
        <>
          <Header />
          <PublicNotFound />
          <Footer />
        </>
      }
    />
  );
}
