import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { getDashboardStatsService } from "@/modules/dashboard/services/get-dashboard-stats.service";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  period: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 30;
      const parsed = parseInt(val.replace("d", ""), 10);
      return isNaN(parsed) ? 30 : parsed;
    }),
});

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const { searchParams } = new URL(request.url);
    const parseResult = querySchema.safeParse({
      period: searchParams.get("period") || undefined,
    });

    const periodDays = parseResult.success ? parseResult.data.period : 30;

    const stats = await getDashboardStatsService(user, periodDays);

    return successResponse({
      message: "Dashboard stats fetched successfully",
      data: stats,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
