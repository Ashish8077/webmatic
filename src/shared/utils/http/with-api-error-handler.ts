import { NextResponse } from "next/server";

import { handleApiError } from "@/shared/utils/http/handle-api-error";

type ApiRouteHandler<TArgs extends unknown[]> = (
  ...args: TArgs
) => NextResponse | Promise<NextResponse>;

export function withApiErrorHandler<TArgs extends unknown[]>(
  handler: ApiRouteHandler<TArgs>,
): ApiRouteHandler<TArgs> {
  return async (...args: TArgs): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
}
