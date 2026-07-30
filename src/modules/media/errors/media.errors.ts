import { AppError } from "@/shared/utils/errors/app-error";

export class MediaNotFoundError extends AppError {
  constructor(message = "Media not found") {
    super(message, 404, undefined, "MEDIA_NOT_FOUND");
  }
}

export class InvalidMediaTypeError extends AppError {
  constructor(message = "Invalid or unsupported media type") {
    super(message, 400, undefined, "INVALID_MEDIA_TYPE");
  }
}

export class FileTooLargeError extends AppError {
  constructor(message = "File exceeds the maximum allowed size") {
    super(message, 400, undefined, "FILE_TOO_LARGE");
  }
}

export class UploadFailedError extends AppError {
  constructor(message = "Failed to upload media file") {
    super(message, 500, undefined, "UPLOAD_FAILED");
  }
}

export class StorageDeleteError extends AppError {
  constructor(message = "Failed to delete media file from storage") {
    super(message, 500, undefined, "STORAGE_DELETE_FAILED");
  }
}

export class DuplicateMediaError extends AppError {
  constructor(message = "Media file already exists") {
    super(message, 409, undefined, "DUPLICATE_MEDIA");
  }
}
