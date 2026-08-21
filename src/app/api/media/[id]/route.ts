import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { MediaService } from "@/modules/media/services/media.service";
import {
  UpdateMediaValidatedInput,
  updateMediaSchema,
} from "@/modules/media/validators/update-media.schema";
import { IdRouteParams } from "@/shared/types/route-params";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { idParamSchema } from "@/shared/utils/validators/route-params.schema.";
import { validate } from "@/shared/utils/validators/validation";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id: mediaId } = validate(idParamSchema, await params);

    const mediaData = await MediaService.getMedia(mediaId, user);

    return successResponse({
      message: "Media fetched successfully",
      data: mediaData,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id: mediaId } = validate(idParamSchema, await params);

    const updateMediaData: UpdateMediaValidatedInput = validate(
      updateMediaSchema,
      await request.json(),
    );

    await MediaService.updateMedia(mediaId, updateMediaData, user);

    return successResponse({
      message: "Media updated successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id: mediaId } = validate(idParamSchema, await params);

    await MediaService.deleteMedia(mediaId, user);

    return successResponse({
      message: "Media deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
