import { AppError } from "./app-error";

export class RateLimitError extends AppError {
  constructor(message = "Too many requests. Please try again later.") {
    super(message, 429, undefined, "RATE_LIMIT_EXCEEDED");
    this.name = "RateLimitError";
  }
}
