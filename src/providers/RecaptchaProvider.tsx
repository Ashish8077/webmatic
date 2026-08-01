"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { env } from "@/config/env.client";

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  // Skip reCAPTCHA provider entirely when no site key is configured (e.g. local dev)
  if (!env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
