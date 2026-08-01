import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { MediaService } from "@/modules/media/services/media.service";
import { getMediaQuerySchema } from "@/modules/media/validators/get-media-query.schema";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";
import { NextResponse } from "next/server";
import {
  InvalidMediaTypeError,
  FileTooLargeError,
} from "@/modules/media/errors/media.errors";
import {
  ALLOWED_UPLOAD_MIME_TYPES,
  MAX_FILE_SIZE,
} from "@/modules/media/constants/media.constants";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const folderRaw = formData.get("folder");
    const folder = typeof folderRaw === "string" ? folderRaw : null;


    if (!file || !(file instanceof File)) {
      throw new InvalidMediaTypeError("No valid file uploaded");
    }

    if (!ALLOWED_UPLOAD_MIME_TYPES.includes(file.type)) {
      throw new InvalidMediaTypeError(`Unsupported file type: ${file.type}`);
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new FileTooLargeError(
        "File exceeds the maximum allowed size of 10MB",
      );
    }

    const media = await MediaService.uploadMedia(file, folder, user);

    return successResponse({
      message: "Media uploaded successfully",
      statusCode: 201,
      data: media,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);

    const query = validate(
      getMediaQuerySchema,
      Object.fromEntries(searchParams.entries()),
    );

    const mediaData = await MediaService.getMediaList(query, user);

    return successResponse({
      message: "Media fetched successfully",
      data: mediaData,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
