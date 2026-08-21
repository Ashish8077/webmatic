import { AppError } from "./app-error";

export class ServiceUnavailableError extends AppError {
  constructor(message = "Service is temporarily unavailable. Please try again.") {
    super(message, 503, undefined, "SERVICE_UNAVAILABLE");
    this.name = "ServiceUnavailableError";
  }
}
