import { NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { validate } from "@/shared/utils/validators/validation";
import { getLeadsQuerySchema } from "@/modules/leads/validation/admin-lead.schema";
import { exportLeadsService } from "@/modules/leads/services/export-leads.service";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { AppError } from "@/shared/utils/errors/app-error";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const filters = validate(getLeadsQuerySchema, queryParams);

    const csvData = await exportLeadsService(filters, user);
    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `leads_export_${dateStr}.csv`;

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
