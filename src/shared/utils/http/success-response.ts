import { NextResponse } from "next/server";

interface SuccessResponse<T> {
  message?: string;
  statusCode?: number;
  data?: T;
}

export function successResponse<T>({
  message = "Success",
  statusCode = 200,
  data = undefined,
}: SuccessResponse<T>): NextResponse {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    {
      status: statusCode,
    },
  );
}
