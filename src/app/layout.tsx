import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
import { QueryProvider } from "@/providers/QueryProvider";
import { RecaptchaProvider } from "@/providers/RecaptchaProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  ),
  title: {
    default: "Webmatic",
    template: "%s | Webmatic",
  },
  description: "Content Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark h-full antialiased scroll-smooth"
      style={{ colorScheme: "dark" }}
    >
      <body className={`min-h-full flex flex-col ${inter.className}`} suppressHydrationWarning>
        <RecaptchaProvider>
          <QueryProvider>{children}</QueryProvider>
        </RecaptchaProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
