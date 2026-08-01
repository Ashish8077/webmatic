import { AppError } from "./app-error";

export class RecaptchaVerificationError extends AppError {
  constructor(message = "Security verification failed.") {
    super(message, 403, undefined, "RECAPTCHA_VERIFICATION_FAILED");
    this.name = "RecaptchaVerificationError";
  }
}
