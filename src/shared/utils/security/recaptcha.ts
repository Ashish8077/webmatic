import { env } from "@/config/env.server";
import { RecaptchaVerificationError } from "../errors/recaptcha-error";
import { ServiceUnavailableError } from "../errors/service-unavailable-error";

export async function verifyRecaptcha(token: string): Promise<void> {
  const secretKey = env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    return; // Bypass verification in dev if no key is configured
  }
  const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new ServiceUnavailableError("Failed to communicate with reCAPTCHA service");
    }

    const data = await response.json();

    if (!data.success) {
      throw new RecaptchaVerificationError("Invalid reCAPTCHA token.");
    }

    if (data.score !== undefined && data.score < 0.5) {
      throw new RecaptchaVerificationError("reCAPTCHA score too low.");
    }
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof RecaptchaVerificationError) {
      throw error;
    }
    
    if (error instanceof Error && error.name === "AbortError") {
      throw new ServiceUnavailableError("reCAPTCHA service timed out. Please try again.");
    }

    throw new ServiceUnavailableError("reCAPTCHA verification failed due to network error.");
  }
}
